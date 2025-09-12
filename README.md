# Pure Energy Germany Challenge

This project contains a single-page React application for the Pure Energy Germany sales challenge.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static site will be generated in the `docs` directory and includes a `CNAME` file for `challenge.pureenergygermany.de`.

## Deploy to GitHub Pages

1. Commit the generated `docs` folder to the `main` branch and push it to GitHub.
2. In the repository settings, enable **Pages** with source set to `main` and folder `docs`.
3. Add a CNAME record for `challenge.pureenergygermany.de` in the IONOS DNS panel pointing to `<your‑github‑username>.github.io`.
4. Back in GitHub settings, set the custom domain to `challenge.pureenergygermany.de` and enforce HTTPS.

After DNS propagation, your site will be served from `https://challenge.pureenergygermany.de`.

## Testing

```bash
npm test
```

Runs the Vitest unit tests.
