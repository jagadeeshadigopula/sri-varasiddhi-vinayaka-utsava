# Admin Donation Module

This module is designed for your existing GitHub Pages website.

## What it does
- Adds an Admin Donation login page instead of a public Donate button.
- Admin enters donor name, phone, amount, payment method, date and optional remarks.
- Saves records into a private Google Sheet through Google Apps Script.
- Does not ask for donor email, address or transaction ID.
- Generates a printable payment slip.
- Uses the supplied Lord Vinayaka image as a light watermark on the slip.
- No admin username/password is stored in GitHub.

## Existing website link
Add this to your existing navigation:
<a href="admin-donation.html" class="nav-btn">🔐 Admin Donation</a>

If you do not want any donation button for the public, remove the existing Donate link and use only the admin link above.

## Files
- admin-donation.html
- admin-donation.css
- admin-donation.js
- assets/vinayaka-watermark.png
- apps-script/Code.gs
- apps-script/SETUP.txt

First complete Google Apps Script setup, then put the /exec URL in admin-donation.js.
