# Meebu Games website

A complete, responsive multi-page game studio portfolio built with plain HTML, CSS, and JavaScript. No framework or build step is required.

## Pages

- Home — `index.html`
- Games — `games.html`
- Studio — `studio.html`
- Careers — `careers.html`
- Contact — `contact.html`
- Custom 404 — `404.html`

## Preview locally

Open `index.html` directly, or run a simple static server from the project folder:

```powershell
py -3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish on GitHub Pages

1. Push this folder to the repository's `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/(root)`, then save. GitHub Pages will publish the root `index.html`.

## Before launch

Replace the sample email addresses (`@meebugames.com`), studio facts, roles, and game copy with your real details. Generated concept artwork is stored in `assets/images/` and can be replaced without changing the layout if the filenames stay the same.

## Image generation notes

The three portfolio artworks were generated with the built-in image generator using these briefs:

- `starfall-drift.webp`: lone futuristic courier on a hoverbike crossing an alien salt desert beneath a fractured moon; cinematic indigo/cyan key art; no text or logos.
- `neon-tide.webp`: diver overlooking a flooded neon megacity with colossal spectral koi; painterly magenta/cyan concept art; no text or logos.
- `hollow-crown.webp`: explorer beneath a colossal broken stone king in an ash-covered valley; dark-fantasy concept art with amber fissures; no text or logos.
