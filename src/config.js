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
  date: "Sunday, 11 Oct",                  // e.g. "Sunday, 12 Oct"  ("" hides the date everywhere)
  dateShort: "11 Oct",             // e.g. "12 Oct" — used in the mobile sticky bar
  time: "7 PM IST",

  // For the "Add to Google Calendar" button on the thank-you page.
  // Format: YYYYMMDDTHHMMSS in IST. Leave "" to hide the button.
  calendarStart: "20261011T190000",         // e.g. "20261012T190000"
  calendarEnd: "20261011T220000",           // e.g. "20261012T220000"

  // ---- Links ----
  checkoutUrl: "https://rzp.io/rzp/4AIfdE6I",   // Razorpay payment page
  whatsappGroupUrl: "https://chat.whatsapp.com/DL0folq4rIrHE49rzZIgvX", // shown on thank-you page
  email: "hello@perfomitymedia.com",
  whatsappNumber: "916264600023",                     // country code + number, no "+" or spaces
  privacyUrl: "/privacy",
  termsUrl: "/terms",
  refundUrl: "/refund",
  refundText: "[REFUND POLICY]",                       // answer shown in the FAQ

  // ---- Tracking (optional) ----
  metaPixelId: "889741520669002",           // e.g. "123456789012345" — leave "" to disable
  passUtmToCheckout: false     // true = append ?utm_... from the ad click to the checkout link
};
