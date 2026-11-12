# Design O’Hive

A responsive, static website for Design O’Hive, built with HTML, CSS, and vanilla JavaScript.

## Preview locally

Run a local HTTP server from this directory, then open the address it prints (for example, `http://localhost:8000`):

```sh
python3 -m http.server 8000
```

Serve the site over HTTP or HTTPS when previewing the showreel. YouTube embeds require a page referrer; opening `index.html` directly as a local file can prevent inline playback.

## Pages

- `index.html` — one-page studio site with services, selected work, clients, testimonials, and contact form.
- `portfolio.html` — selected work gallery.

The site has no build step or package dependencies. Images and fonts are currently loaded from their hosted URLs.
