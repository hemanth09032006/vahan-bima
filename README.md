# Vahan Bima — वाहन बीमा — వాహన బీమా

A single-page website for vehicle insurance lead capture, challan checks, and renewal reminders — all routed to WhatsApp. No backend, no database, no payment handling on this site: it only ever hands off to WhatsApp.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure and content |
| `style.css` | All styling (number-plate motif, colours, layout) |
| `script.js` | Form validation + WhatsApp message building |

## 1. Before you publish — set your WhatsApp number

Open `script.js` and change this line near the top:

```js
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // <-- REPLACE THIS
```

Replace it with Hemanth's **secondary WhatsApp Business number**, in international format with no `+`, spaces, or dashes.

Example: if the number is `98765 00000`, write:

```js
const WHATSAPP_NUMBER = "919876500000";
```

That's the only code change required before going live.

## 2. How the WhatsApp hand-off works

Every button on the site (quote form, "Check Challan," "Check Renewal Status," the floating WhatsApp button, nav/footer links) opens:

```
https://wa.me/<your number>?text=<pre-filled message>
```

This opens WhatsApp (app on mobile, WhatsApp Web on desktop) with the customer's details already typed into the message box. The customer still has to tap **Send** — nothing is transmitted without them confirming, and no data ever passes through a server you'd need to maintain.

The signature "number plate" widget in the hero captures **mobile number + vehicle registration number** first, since that's the minimum you need to look someone up or follow up with them. It's reused for all three quick actions (quote / challan / renewal) so customers only type it once.

## 3. Deploying the site (pick one — all free)

### Option A: Netlify Drop (easiest, no account needed to start)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole `vahan-bima` folder onto the page
3. You'll get a live URL in seconds (you can add a custom domain later)

### Option B: GitHub Pages
1. Create a new GitHub repository (e.g. `vahan-bima`)
2. Upload `index.html`, `style.css`, `script.js` to the root
3. Go to **Settings → Pages**, set source to `main` branch, root folder
4. Your site will be live at `https://<your-username>.github.io/vahan-bima/`

### Option C: Any regular web hosting (GoDaddy, Hostinger, etc.)
1. Upload the three files to your hosting's `public_html` (or equivalent) folder via FTP or the file manager
2. Visit your domain — it should load immediately

## 4. Connecting a custom domain (optional)

If you buy a domain like `vahanbima.in` or `vahanbima.com`:
- Netlify: **Site settings → Domain management → Add custom domain**, then update your domain's DNS as instructed
- GitHub Pages: add a `CNAME` file with your domain name, then point your domain's DNS to GitHub's IPs (GitHub's docs walk through this)

## 5. Sharing the site

- Put the link in your WhatsApp Business profile and status
- Share in local community/social groups
- Print the link (or a QR code to it) on any physical materials — many free QR generators exist online (e.g. search "free QR code generator")

## 6. What this site intentionally does NOT do

- It does **not** collect payments — every payment happens on the insurer's own gateway, shared manually by Hemanth on WhatsApp, per your confirmed process
- It does **not** store customer data anywhere — there's no database; all details go straight into a WhatsApp message
- It does **not** require an app, login, or account for customers

## 7. Easy future additions

- **Language toggle** — add Hindi/Telugu translations of the copy if you want full bilingual pages (currently the site has bilingual headings but English body copy)
- **Real testimonials** — swap the three sample quotes for real customer feedback as you collect it
- **Analytics** — add a free tool like Plausible or Google Analytics if you want to see visitor numbers later

---

Questions about editing the content later — just open `index.html` in any text editor; the text you'd want to change (headlines, testimonials, step descriptions) is plain and easy to find.
