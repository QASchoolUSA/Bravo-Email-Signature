# Bravo Transport — Email Signature Generator

Web app to generate Outlook-safe HTML email signatures for [Bravo Transport](https://bravo-transport.com/en/).

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## How to use

1. Enter **full name** (required) and **title** (optional — leave blank to omit).
2. Adjust email, phones, fax, company, address, and website as needed.
3. Toggle social icons if desired.
4. Click **Copy HTML** and paste into your email client, or **Download HTML**.

### Install in email clients

- **Gmail:** Settings → See all settings → General → Signature → paste (Cmd/Ctrl+V).
- **Outlook (desktop):** File → Options → Mail → Signatures → paste into the editor.
- **Apple Mail:** Settings → Signatures → create a signature and paste.

Images in the exported signature use absolute URLs on `bravo-transport.com`, so they load after you paste into an email client.

## Brand assets

Logo, social icons, and fleet photos are mirrored under `public/assets/` from the live site for local preview. Exported HTML points at the CDN originals.
