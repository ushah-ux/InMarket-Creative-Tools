# InMarket Creative Tools

A landing page that collects InMarket's in-house creative tools in one place.

**Live:** https://ushah-ux.github.io/InMarket-Creative-Tools/

Password protected. Ask the InMarket creative team for access.

## Adding a tool

1. Put a square thumbnail (SVG, PNG or JPG, about 800×800) in `thumbs/`.
2. In `source/hub.html` (kept on your Mac, not in this repo), copy one entry in the `TOOLS` list and fill in `name`, `kicker`, `url`, `thumb`, `description` and `tags`.
3. Add `isNew: true` to show a "New" badge. Leave `url` empty to show "Coming soon".
4. Double-click `Lock Hub.command`, then upload the new `index.html`.

## Publishing with GitHub Pages

Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `(root)` → Save.
