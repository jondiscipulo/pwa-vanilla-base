# PWA Base - Vanilla

This is a no-build, progressive web app that demonstrates basic PWA capabilities:

- offline caching via a Service Worker
- a standalone installable display
- an online/offline status indicator

This is a PWA base with minimum requirements created with vanilla HTML, CSS and JS.

## Minimum requirements for a PWA

The following are the minimum requirements for an app to be a PWA (per
[MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
and [web.dev](https://web.dev/articles/install-criteria)):

1. **HTML app shell** (`index.html`) — a document that the browser loads.
2. **Web app manifest** (`manifest.json`) referenced from the HTML via
   `<link rel="manifest" href="...">`.
3. **Manifest fields (Chromium minimum):**
   - `name` or `short_name`
   - `icons` containing a **192px** and a **512px** icon
   - `start_url`
   - `display` (one of `fullscreen`, `standalone`, `minimal-ui`,
     `window-controls-overlay`)
   - `prefer_related_applications` must not be present or `false`
4. **Installable icons** — 192x192 and 512x512 (maskable recommended).
5. **Service Worker** (`sw.js`) — required for offline support and PWA
   behavior (install, fetch, activate handlers).
6. **HTTPS** (or `localhost`/`127.0.0.1`) — required for real-world install
  ability over the network.

## Compliance check

| Requirement | Status | Evidence |
|---|---|---|
| HTML app shell (`index.html`) | ✅ Complies | Has `<!DOCTYPE html>`, viewport, title, and links stylesheet/manifest. |
| Manifest referenced in HTML | ✅ Complies | `<link rel="manifest" href="manifest.json">` in `index.html`. |
| Manifest with `name` / `short_name` | ✅ Complies | `name` + `short_name` present. |
| Manifest with `icons` (192px + 512px) | ✅ Complies | `icons/icon-192.svg` and `icons/icon-512.svg`, sizes `192x192` and `512x512`. |
| Manifest with `start_url` | ✅ Complies | `"start_url": "/"`. |
| Manifest with `display` | ✅ Complies | `"display": "standalone"`. |
| `prefer_related_applications` absent | ✅ Complies | Not present. |
| Service Worker with install/fetch/activate handlers | ✅ Complies | `sw.js` handles `install`, `fetch`, and `activate` events and caches core assets. |
| Online/offline handling | ✅ Complies | `app.js` registers the SW and listens for `online`/`offline`. |
| HTTPS / localhost served | ⚠️ N/A locally | No live server here; HTTPS required in production for installability. |

## Conclusion

**The project complies with the minimum requirements for a PWA.** It has the
required HTML shell, a compliant manifest (name, short_name, 192/512 icons,
start_url, standalone display, no `prefer_related_applications`), a Service
Worker for offline caching and install behavior, and the icons referenced by
the manifest.

Minor optional best practices not strictly required:
- Icons are SVG. Chromium supports SVG icons, but providing a raster PNG
  fallback is recommended for maskable installability.
- `background_color` and `theme_color` are present (good for splash screens).
- No screenshots / richer install UI (optional, recommended for a richer
  install experience).
