# Workout Log

Offline-first workout logger (PWA). Pick a workout, then log weight and reps per set.
No build step, no server, no dependencies. Data stays in the browser (`localStorage`).

## Members
Each member picks who they are on first open and then sees only their own workouts, today's plan and history on this phone. Plans live at the top of `index.html` (`PEOPLE`); edit there when the gym changes a plan. This keeps views separate; it is not a lock.
Back up and Restore apply to the member who is selected, and a backup only restores into the same member.

## Files
- `index.html` – the whole app
- `sw.js` – offline cache (bump `CACHE` when `index.html` changes)
- `manifest.webmanifest`, `icons/` – install metadata
- `icon.svg` – icon source

## Run locally
    python3 -m http.server 8080   # then open http://localhost:8080

## Deploy (free)
GitHub Pages: push to GitHub, Settings -> Pages -> deploy from `main` / root.
Any static host works, but it must be HTTPS for install and offline.

## Install on a phone
- Android (Chrome): menu -> Install app.
- iPhone (Safari): Share -> Add to Home Screen.
Open it once online so the offline cache fills.

## Known limits
- iOS can clear browser data for sites unused for weeks. Back up before long breaks (Back up on the home screen saves a JSON file; Restore merges it back).
- Heading font (Barlow Condensed) loads from Google Fonts on first online visit; a system font is used until then.

## Licence
MIT
