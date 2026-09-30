/* ============================================================
   FIRE YOUR AGENCY — SITE SETTINGS
   Edit ONLY this file to update links, date, price and seats.
   Leave a value as "" to hide it on the page.
   ============================================================ */
window.FYA_CONFIG = {
  // ---- Workshop ----
  price: "99",                 // shown as ₹99 everywhere
  mrp: "999",                  // struck-through price
  seats: "47",
  date: "",                    // e.g. "Sunday, 12 Oct"  ("" hides the date everywhere)
  dateShort: "",               // e.g. "12 Oct" — used in the mobile sticky bar
  time: "7 PM IST",

  // For the "Add to Google Calendar" button on the thank-you page.
  // Format: YYYYMMDDTHHMMSS in IST. Leave "" to hide the button.
  calendarStart: "",           // e.g. "20261012T190000"
  calendarEnd: "",             // e.g. "20261012T220000"

  // ---- Links ----
  checkoutUrl: "https://rzp.io/rzp/4AIfdE6I",   // Razorpay payment page
  whatsappGroupUrl: "https://chat.whatsapp.com/YOUR-GROUP-INVITE", // shown on thank-you page
  email: "hello@perfomitymedia.com",
  whatsappNumber: "91XXXXXXXXXX",                      // country code + number, no "+" or spaces
  privacyUrl: "/privacy",
  termsUrl: "/terms",
  refundUrl: "/refund",
  refundText: "[REFUND POLICY]",                       // answer shown in the FAQ

  // ---- Tracking (optional) ----
  metaPixelId: "",             // e.g. "123456789012345" — leave "" to disable
  passUtmToCheckout: false     // true = append ?utm_... from the ad click to the checkout link
};
