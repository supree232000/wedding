# Wedding website + Google Sheets RSVP

This is a minimalist static wedding website (without a photo gallery) designed for GitHub Pages. Guest RSVPs are recorded in a Google Sheet through Google Apps Script.

## 1. Create the Google Sheet

1. Create a blank Google Sheet in the Google account where you want to receive RSVPs.
2. Give it a name such as `Priyanka & Suman Wedding RSVPs`.
3. Open **Extensions → Apps Script**.
4. Replace the starter code with the contents of `Code.gs` from this project.
5. Save the project.

The script creates a tab named `RSVP Responses` automatically when the first RSVP arrives.

## 2. Deploy the Apps Script

1. In Apps Script, click **Deploy → New deployment**.
2. Select the gear icon and choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone** (guests do not need to sign in).
5. Click **Deploy** and authorize the script.
6. Copy the Web app URL. It should end in `/exec`.

Keep this URL private to your website project; do not post it publicly elsewhere.

## 3. Connect the website

1. Open `index.html`.
2. Find this line near the bottom:

   `const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";`

3. Replace the placeholder with your copied Apps Script URL, keeping the quotation marks.
4. Save `index.html`.

## 4. Publish on GitHub Pages

1. Create a GitHub repository, for example `wedding-website`.
2. Upload `index.html` and `README.md` to the repository root.
3. In **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/(root)`, then save.
4. Open the published URL and test one RSVP. Check the `RSVP Responses` tab in your Google Sheet.

## Important notes

- The RSVP form sends the guest's name, contact, attendance, guest count, message, and timestamp to your spreadsheet.
- The browser uses a no-CORS request because Apps Script web apps do not expose standard CORS response headers. The page can show that the request was sent, but cannot independently verify that Google Sheets successfully stored it. Check the sheet during testing.
- Anyone with the website can submit an RSVP. Do not put sensitive personal information in the form.
- If you change Apps Script code after deployment, use **Deploy → Manage deployments → Edit → New version → Deploy**.
- The Apps Script deployment must remain accessible to **Anyone** for guests who are not signed into your Google account.
