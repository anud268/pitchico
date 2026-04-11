# E-commerce Static Site with Google Sheets & Razorpay

This is a premium static website designed to sell a few products, handle checkouts via Razorpay, and save orders to Google Sheets without needing a true backend database.

## 1. Setup Razorpay
To start receiving payments:
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Navigate to **Settings > API Keys** and generate Test/Live keys.
3. Open `main.js` and replace `RAZORPAY_KEY` on line 18 with your actual `rzp_test_...` or `rzp_live_...` key.
*Note: This basic checkout uses client-side parameter passing. It's great for static sites but please consult Razorpay for advanced security requirements later if needed.*

## 2. Setup Google Sheets Integration
To save incoming orders directly into your Google Sheet:

1. Open a new [Google Sheet](https://sheets.new).
2. Add the following column headers in Row 1:
   `Date`, `Name`, `Email`, `Phone`, `Address`, `City`, `Pincode`, `Product`, `Amount`, `Payment ID`, `Status`.
3. In the menu, click **Extensions > Apps Script**.
4. Delete the existing code and paste the following:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.address,
      data.city,
      data.pincode,
      data.product,
      data.amount,
      data.payment_id,
      data.status
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click **Deploy > New Deployment**.
6. Select **Web App** as the type.
7. Execute as: **Me**.
8. Who has access: **Anyone**.
9. Click **Deploy**. (It will ask you to authorize permissions).
10. Copy the **Web App URL** generated.
11. Open `main.js` and replace `GOOGLE_SCRIPT_URL` on line 16 with this URL.

## 3. Running the App Local
If you have Node installed, use the Vite server:
```bash
npm run dev
```

## 4. Deployment
Because it's a completely static app:
1. Run `npm run build`.
2. Upload the `dist` folder to Vercel, Netlify, or Hostinger.
