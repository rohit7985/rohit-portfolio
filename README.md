# rohit-portfolio
# Rohit Kumar Patel — Portfolio

A modern, glassmorphic, 3D-animated portfolio site built with React 18, Vite, and Tailwind CSS.

## Stack
- React 18 + Vite
- Tailwind CSS
- lucide-react (icons)
- Pure CSS 3D transforms for tilt/parallax effects (no heavy 3D libraries)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deploying
`dist/` is a static site — drop it on Vercel, Netlify, GitHub Pages, or any static host.

- **Vercel**: `vercel --prod` (or connect the repo in the dashboard, framework preset "Vite")
- **Netlify**: build command `npm run build`, publish directory `dist`
- **GitHub Pages**: run `npm run build`, then push the `dist/` folder to a `gh-pages` branch (or use the `gh-pages` npm package)

## Project structure

```
rohit-portfolio/
├── index.html          # HTML entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx         # React root
    ├── index.css        # Tailwind directives + global resets
    └── App.jsx          # The full portfolio (single component)
```

## Customizing

- **Content**: all copy and data (experience, projects, skills) live in constants
  at the top of `src/App.jsx` (`PROFILE`, `EXPERIENCE`, `PROJECTS`, `SKILLS`).
- **Colors**: CSS variables are defined in the `<style>` block inside `App.jsx`
  (`--bg`, `--accent`, `--accent-ai`).
- **Social links**: the GitHub/LinkedIn buttons in the contact section currently
  point to `#` — replace with real profile URLs.
