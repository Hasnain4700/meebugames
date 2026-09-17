# Meebu Games website

A complete, responsive multi-page game studio portfolio built with plain HTML, CSS, and JavaScript. No framework or build step is required.

## Pages

- Home — `dist/index.html`
- Games — `dist/games.html`
- Studio — `dist/studio.html`
- Careers — `dist/careers.html`
- Contact — `dist/contact.html`
- Custom 404 — `dist/404.html`

## Preview locally

Open `dist/index.html` directly, or run a simple static server from the project folder:

```powershell
py -3 -m http.server 8000 --directory dist
```

Then visit `http://localhost:8000`.

## Publish on GitHub Pages

1. Create a GitHub repository and push this folder to the `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. The included workflow deploys everything inside `dist/` automatically after each push to `main`.

## Before launch

Replace the sample email addresses (`@meebugames.com`), studio facts, roles, and game copy with your real details. Generated concept artwork is stored in `dist/assets/images/` and can be replaced without changing the layout if the filenames stay the same.

## Image generation notes

The three portfolio artworks were generated with the built-in image generator using these briefs:

- `starfall-drift.webp`: lone futuristic courier on a hoverbike crossing an alien salt desert beneath a fractured moon; cinematic indigo/cyan key art; no text or logos.
- `neon-tide.webp`: diver overlooking a flooded neon megacity with colossal spectral koi; painterly magenta/cyan concept art; no text or logos.
- `hollow-crown.webp`: explorer beneath a colossal broken stone king in an ash-covered valley; dark-fantasy concept art with amber fissures; no text or logos.
