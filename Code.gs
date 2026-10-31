/**
 * Wedding RSVP collector for Google Sheets.
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Extensions -> Apps Script.
 * 3. Replace the editor contents with this code and save.
 * 4. Deploy -> New deployment -> Web app.
 * 5. Execute as: Me. Who has access: Anyone.
 * 6. Deploy, authorize, and copy the Web app URL ending in /exec.
 */
const SHEET_NAME = "RSVP Responses";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp",
        "Guest name",
        "Email or phone",
        "Attendance",
        "Number of guests",
        "Message"
      ]);
      sheet.setFrozenRows(1);
    }

    const params = (e && e.parameter) ? e.parameter : {};
    const name = clean_(params.name);
    const contact = clean_(params.contact);
    const attendance = clean_(params.attendance);
    const guests = clean_(params.guests);
    const message = clean_(params.message);

    if (!name || !attendance) {
      return ContentService.createTextOutput("Missing required fields");
    }

    sheet.appendRow([
      new Date(),
      name,
      contact,
      attendance,
      guests,
      message
    ]);

    return ContentService.createTextOutput("RSVP saved");
  } finally {
    lock.releaseLock();
  }
}

// Prevent spreadsheet formula injection and trim excessively long input.
function clean_(value) {
  let text = String(value || "").trim().slice(0, 2000);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}
