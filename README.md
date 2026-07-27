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

Example: if the number is `98765 43210`, write:

```js
const WHATSAPP_NUMBER = "919876543210";
```

That's the only code change required before going live.

## 2. How the WhatsApp hand-off works

Every button on the site (quote form, "Check Challan," "Check Renewal Status," the floating WhatsApp button, nav/footer links) opens:
