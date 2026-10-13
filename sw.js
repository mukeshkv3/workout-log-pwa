// Offline shell. The page itself is network-first (so updates show on the next open when online) and falls back to the
// saved copy when offline. Icons, manifest and fonts are cache-first. Bump CACHE when index.html changes.
var CACHE = "workout-log-v4";
var SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function save(req, res) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); return res; }
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var path = new URL(req.url).pathname, isPage = req.mode === "navigate" || /\/(index\.html)?$/.test(path);
  if (isPage) {
    // no-cache = always check with the server (GitHub Pages otherwise lets browsers keep a page for 10 minutes)
    e.respondWith(fetch(req, { cache: "no-cache" }).then(function (res) { return save(req, res); })
      .catch(function () { return caches.match(req).then(function (hit) { return hit || caches.match("index.html"); }); }));
    return;
  }
  e.respondWith(caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (res) { return save(req, res); }).catch(function () { return caches.match("index.html"); });
  }));
});
