# Pure Energy Germany sales challenge page

Single-page candidate challenge used by Pure Energy Germany for sales hiring (September 2025), served at challenge.pure-energy-germany.de.

**Status:** Archived · 12 Sep 2025 to 17 Sep 2025 · by [Henri Klein](https://henriklein.de)

**Stack:** React single-page app on GitHub Pages

---
_Repository `peg-sales-challenge-page` follows the naming convention `area-subject[-kind]`. README added by the repo sweep of 22 Nov 2026._


## Original README

## Pure Energy Germany Challenge

This project contains a single-page React application for the Pure Energy Germany sales challenge.

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

The static site will be generated in the `docs` directory and includes a `CNAME` file for your custom domain.

### Deploy to GitHub Pages

1. Commit the generated `docs` folder to the `main` branch and push it to GitHub.
2. In the repository settings, enable **Pages** with source set to `main` and folder `docs`.
3. Add your subdomain as a CNAME record in the IONOS DNS panel pointing to `<your‑github‑username>.github.io`.
4. Back in GitHub settings, set the custom domain to your subdomain and enforce HTTPS.

After DNS propagation, your site will be served from the IONOS subdomain.

### Testing

```bash
npm test
```

Runs the Vitest unit tests.
