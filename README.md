# mokinan.github.io

Personal site of Mohamed Kinan, Principal Flutter Engineer — live at **https://mokinan.github.io**.

Plain HTML, CSS and JavaScript. No framework, no build step, no trackers.

## Editing content

Everything you see on the page — text, links, projects, packages, screenshots — lives in
[`assets/js/content.js`](assets/js/content.js). Edit it, commit, and GitHub Pages redeploys
in about a minute.

| To change… | Edit in `content.js` |
|---|---|
| Headline / intro | `hero.title`, `hero.intro` (`<em>` = italic accent) |
| Phones in the hero | `hero.screens` |
| Numbers strip | `stats` |
| Production apps | `production.items` |
| Projects | `projects` (each has its own `accent` color) |
| Packages | `packages` |
| Principles / toolbox | `principles`, `toolbox` |

Images go in `assets/img/`. Screens look best at 540 × 1174 (phone ratio).

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Structure

```
index.html            page skeleton and meta tags
assets/js/content.js  all content
assets/js/main.js     rendering and animations
assets/css/style.css  design tokens, layout, light/dark themes
assets/img/           screenshots, favicon, social preview (og.png)
```

Animations respect `prefers-reduced-motion`, and the theme follows the system setting
unless the visitor picks one with the toggle.
