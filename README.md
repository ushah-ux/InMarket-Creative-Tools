# InMarket Creative Tools

A landing page that collects InMarket's in-house creative tools in one place.

**Live:** https://ushah-ux.github.io/InMarket-Creative-Tools/

## Tools

| Tool | Link |
|---|---|
| InMarket Journey Studio | https://ushah-ux.github.io/InMarket-User-Journey-Creator/ |
| DOOH Proof of Placement Studio | https://ushah-ux.github.io/InMarket-POP-Placement-Studio/ |
| CTV & Social Spot Builder | http://localhost:8765/ (installed app; web version at https://ushah-ux.github.io/ctv-social-spot-builder/) |
| InMarket Logo Hub | https://inmarket-logo-hub.vercel.app/ |

## Adding a tool

1. Put a square thumbnail (SVG, PNG or JPG, about 800×800) in `thumbs/`.
2. In `index.html`, copy one entry in the `TOOLS` list and fill in `name`, `kicker`, `url`, `thumb`, `description` and `tags`.
3. Add `isNew: true` to show a "New" badge. Leave `url` empty to show "Coming soon".

## Publishing with GitHub Pages

Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `(root)` → Save.
