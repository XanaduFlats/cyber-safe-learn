# Deploy CyberSafe Learn on GitHub Pages — click-by-click checklist

For a complete beginner. No command line needed. All steps are free.

## What you need first

- A GitHub account (free). You will create it in Step 1.
- The files in this folder: `index.html`, `about.html`, `contact.html`, `privacy.html`, `disclaimer.html`, `ads.txt`, `DEPLOY.md`, `test.js`
- Contact email is set: `contact.html` uses magicalfluteofxanadu@gmail.com.
- Before AdSense goes live, replace the placeholder in `ads.txt` only after Google AdSense approves you. Do not invent a publisher ID.

## Step 1 — Create a GitHub account

1. Go to https://github.com in your browser.
2. Click **Sign up**.
3. Enter an email address, a password, and a username. This username will be in your site address, so pick something simple.
4. Verify your email. GitHub will send you a code or a link.
5. Sign in.

## Step 2 — Create a repository

A repository is just a folder on GitHub that holds your files.

1. Click the **+** at the top right, then click **New repository**.
2. Repository name: type a simple name with no spaces, for example `cyber-safe-learn`
3. Make it **Public**. GitHub Pages on a free account needs a public repository.
4. Leave **Add a README file** unchecked. You are uploading your own files.
5. Click **Create repository**.

## Step 3 — Upload all the files in this folder

1. On the new repository page, click **uploading an existing file**.
2. In your computer's file manager, open the folder `cyber-learn-companion`.
3. Select all the files in that folder: `index.html`, `about.html`, `contact.html`, `privacy.html`, `disclaimer.html`, `ads.txt`, `DEPLOY.md`, `test.js`
4. Drag them into the GitHub upload area, or click **choose your files** and select them.
5. At the bottom, under Commit changes, click **Commit changes**.
6. Check the repository file list. You must see `index.html` at the top level, not inside another folder. If you see a folder name first, you uploaded the folder itself by mistake — delete it and upload the files inside it instead.

## Step 4 — Turn on GitHub Pages

1. In the repository, click **Settings** (top menu).
2. In the left menu, click **Pages**.
3. Under **Build and deployment**, under **Source**, select **Deploy from a branch**.
4. Under **Branch**, select **main**.
5. Next to Branch, select **/(root)**.
6. Click **Save**.
7. Wait 1–2 minutes. Refresh the Pages page. At the top you will see: “Your site is live at https://yourname.github.io/cyber-safe-learn/” — with your username and your repository name in place of `yourname` and `cyber-safe-learn`.

## Step 5 — Open your live site and check it

1. Open the link from Step 4, for example: `https://yourname.github.io/cyber-safe-learn/`
2. Check the Home page loads, the Continue button is visible, and the 3 picture cards show.
3. Check Learn, Practice, and My Safety open.
4. Check the footer links open:
   - `https://yourname.github.io/cyber-safe-learn/about.html`
   - `https://yourname.github.io/cyber-safe-learn/contact.html`
   - `https://yourname.github.io/cyber-safe-learn/privacy.html`
   - `https://yourname.github.io/cyber-safe-learn/disclaimer.html`
5. Check `https://yourname.github.io/cyber-safe-learn/ads.txt` loads and shows the placeholder comment.
6. Turn off your internet (or use your browser's offline mode) and reload the page. The lessons must still work. No ad slot must appear when offline.

## Step 6 — How to update the site later

1. In the repository, click the file you changed, for example `index.html`.
2. Click the pencil icon **Edit this file**, paste the new version, and click **Commit changes**.
   - Or: click **Add file > Upload files**, upload the new `index.html`, and click **Commit changes**. It will replace the old one.
3. Wait 1–2 minutes, then refresh your live site. GitHub Pages rebuilds automatically.

## If the page shows 404

“404” means GitHub cannot find the page. Check these, in order:

1. **Branch:** In Settings > Pages, is the branch set to **main** and the folder to **/(root)**? If not, set it and click Save.
2. **Folder:** Is `index.html` at the top level of the repository, not inside a subfolder? If it is inside a folder, move it to the top level.
3. **File name:** Is the file named exactly `index.html`, all lowercase? `Index.html` or `INDEX.HTML` will not work.
4. **Wait:** Did you wait 1–2 minutes after saving Pages settings? Refresh the page and try again.
5. **Repository is public:** Is the repository Public? A private repository will not publish on a free GitHub Pages account.

## After the site is live — AdSense (do this later, not before the site is live)

1. The site must be live with real content first. Do not apply to AdSense before Step 5 works.
2. Apply at Google AdSense with your Google account, using your live site address.
3. When approved, Google will give you: (a) a Publisher ID like `pub-XXXXXXXXXXXXXXXX`, and (b) a small piece of ad code.
4. Update `ads.txt` with your real Publisher ID line, using the format in that file, and upload it again.
5. Paste the AdSense ad code inside the existing ad slot in `index.html`, where the comment `<!-- ADSENSE: ... -->` is. Do not add any other tracking code.
6. Do not enter bank details, passwords, or ID in chat or in any file. Enter them only on Google's own secure payment pages.

## Files in this folder

- `index.html` — the app
- `about.html` — what the app is
- `contact.html` — how to reach the owner (magicalfluteofxanadu@gmail.com)
- `privacy.html` — plain-language privacy policy
- `disclaimer.html` — education only, not professional advice
- `ads.txt` — AdSense placeholder, to replace after approval
- `test.js` — automated tests for the app (run with `node test.js`)
- `DEPLOY.md` — this checklist
