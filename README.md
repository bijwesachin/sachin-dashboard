# Sachin Dashboard — PWA (GitHub Pages)

This folder is ready to deploy as a **Progressive Web App** and host on **GitHub Pages**.

## Files
- `index.html` — your live watchlist dashboard (14-day, highlights, OPEX + VIX Settlement)
- `manifest.webmanifest` — PWA metadata
- `service-worker.js` — offline cache & app shell
- `icons/` — app icons (180px for iOS, 512px for install prompts)
- `README.md` — these instructions

## Deploy on GitHub Pages
1. Create a **public repo** (e.g., `sachin-dashboard`).
2. Upload the **contents of this folder** (keep `index.html` at the root).
3. In the repo: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/** (root)
4. Wait 1–2 minutes, then open:  
   `https://<your-username>.github.io/<your-repo>/`

## Install on iPhone (Add to Home Screen)
1. Open the GitHub Pages URL in **Safari**.
2. Tap the **Share** icon → **Add to Home Screen**.
3. Name it (e.g., *Sachin Dashboard*) → **Add**.
4. Launch it from your Home Screen. It will open full-screen like an app.

### Notes (iOS)
- iOS doesn’t support push notifications for generic web PWAs yet.
- Data refresh uses your in-app **Refresh** button.
- The app works **offline** with the last-loaded data (API calls will retry next time online).

## Updating
- Edit files and push to `main`. Pages will update automatically.
- If changes don’t appear, bump the service worker cache version:  
  Change `const CACHE_NAME = 'sachin-dash-v1'` → `'sachin-dash-v2'`.

Enjoy!
