# Seven Lanterns

Static website that hosts the Seven Lanterns Ren'Py (8.5.3) HTML5/WebAssembly build.

- `/` — landing page
- `/game` — game page; embeds `public/play/index.html` in a 16:9 frame, with Fullscreen and Open in New Tab.
  If no export is present it shows a "not here yet" message.

## Adding the Ren'Py web build

1. In the Ren'Py launcher choose **Web (Beta)** → **Build Web Application** (or "Build and Open").
2. Open the generated `<game>-<version>-web` folder.
3. Copy **all of its contents** into `public/play/`, so `public/play/index.html`, the `.wasm`, `.js`
   and `game.zip`/`.data` files sit directly in that folder (not in a subfolder).
4. Commit and push. Large files: GitHub blocks single files over 100 MB, and Git LFS files are not served by Pages,
   by Pages, so keep the export under that limit.

## Local development

```sh
bun install
bun run dev          # http://localhost:8080
```

## Deploying to GitHub Pages

1. Push this repo to GitHub (branch `main`).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds with
   `GITHUB_PAGES=true BASE_PATH=/<repo-name>/` and publishes `dist/client`.
   The site appears at `https://<user>.github.io/<repo-name>/`.

Manual static build: `GITHUB_PAGES=true BASE_PATH=/my-repo/ bun run build:pages` → upload `dist/client`.
For a user/org site or custom domain at the root, use `BASE_PATH=/`.

All links and assets use the configured base path, and `.nojekyll` is included so Pages serves
every file in the Ren'Py export untouched.
