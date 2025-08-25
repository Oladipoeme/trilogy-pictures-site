# Trilogy Pictures — Static Site

One-page, minimalist site using Tailwind (CDN) with inline SVG logo.

## Files
- `index.html` — the entire site (no build step).

## Deploy (GitHub Pages)
1. Create a new GitHub repo and upload `index.html`.
2. Settings → Pages → Source: **Deploy from a branch** → Branch: **main** → **/root** → Save.
3. Your site will publish at `https://<your-username>.github.io/<repo-name>/`.

## Deploy (Netlify or Vercel)
- Drop the repo or the single `index.html` file into Netlify/Vercel. No build command needed.

## Contact form (next step)
- Replace the stub with Formspree:
  1. Sign up at formspree.io and create a form → get an endpoint like `https://formspree.io/f/xxxx`.
  2. Replace the `<form id="contactForm"...>` with:
     ```html
     <form action="https://formspree.io/f/xxxx" method="POST" class="grid gap-4 max-w-xl">
       <!-- same inputs -->
     </form>
     ```
  3. On success, have Formspree redirect to `/thank-you`.
- Or wire your own backend and POST the form there.

## Editing
- Update copy in `index.html`. The logo is inline SVG; adjust text or sizes directly in the SVG tags.

_Last prepared: 2025-08-09T20:25:45.425265Z_
