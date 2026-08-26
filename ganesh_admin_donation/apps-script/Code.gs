/**
 * Google Apps Script backend for the donation admin page.
 *
 * IMPORTANT:
 * 1. Do NOT put the admin username/password in GitHub.
 * 2. Set them in Script Properties before deployment.
 * 3. Set SHEET_ID in Script Properties.
 * 4. Deploy as a Web App and use the /exec URL in admin-donation.js.
 */

const PROP = PropertiesService.getScriptProperties();
const SESSION_SECONDS = 30 * 60;
const SHEET_NAME = 'Donations';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = String(body.action || '');

    if (action === 'login') return json_(login_(body));
    if (action === 'saveDonation') return json_(saveDonation_(body));

    return json_({ ok:false, message:'Unknown action.' });
  } catch (err) {
    return json_({ ok:false, message: 'Server error: ' + err.message });
  }
}

function login_(body) {
  const username = String(body.username || '');
  const password = String(body.password || '');
  const expectedUser = PROP.getProperty('ADMIN_USERNAME');
  const expectedPass = PROP.getProperty('ADMIN_PASSWORD');

  if (!expectedUser || !expectedPass) {
    return { ok:false, message:'Admin credentials are not configured in Apps Script.' };
  }

  if (!constantTimeEquals_(username, expectedUser) || !constantTimeEquals_(password, expectedPass)) {
    return { ok:false, message:'Invalid admin username or password.' };
  }

  const token = Utilities.getUuid();
  CacheService.getScriptCache().put('SESSION_' + token, 'ADMIN', SESSION_SECONDS);
  return { ok:true, token:token };
}

function saveDonation_(body) {
  if (!isValidSession_(String(body.token || ''))) {
    return { ok:false, message:'Session expired. Please login again.' };
  }

  const donorName = clean_(body.donorName, 100);
  const phone = clean_(body.phone, 20);
  const paymentMethod = clean_(body.paymentMethod, 30);
  const donationDate = clean_(body.donationDate, 20);
  const remarks = clean_(body.remarks, 250);
  const amount = Number(body.amount);

  if (!donorName || !phone || !paymentMethod || !donationDate || !amount || amount <= 0) {
    return { ok:false, message:'Required donation details are missing or invalid.' };
  }

  const sheetId = PROP.getProperty('SHEET_ID');
  if (!sheetId) return { ok:false, message:'SHEET_ID is not configured.' };

  const ss = SpreadsheetApp.openById(sheetId);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp','Donor Name','Phone','Amount','Payment Method','Donation Date','Remarks']);
    sheet.setFrozenRows(1);
    sheet.getRange(1,1,1,7).setFontWeight('bold');
  }

  // Store phone and other user-provided values as plain text where appropriate.
  sheet.appendRow([new Date(), donorName, phone, amount, paymentMethod, donationDate, remarks]);

  return { ok:true, generatedAt: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd-MMM-yyyy HH:mm:ss') };
}

function isValidSession_(token) {
  return !!token && CacheService.getScriptCache().get('SESSION_' + token) === 'ADMIN';
}

function clean_(value, maxLen) {
  return String(value == null ? '' : value).trim().slice(0, maxLen);
}

function constantTimeEquals_(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
