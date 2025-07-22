Booking Engine
A serverless hotel booking engine with separate pages for hourly and nightly bookings, Google Sheets integration, EmailJS for notifications, and Razorpay for payments.
Features

Separate pages for hourly and nightly bookings with room photos and videos.
Room selection with price finalization before payment.
Payment page collects name, adults, children, mobile, and check-in time.
Razorpay integration for secure payments.
Stores booking data in Google Sheets.
Sends confirmation emails via EmailJS.
Hosted on GitHub, deployable to GitHub Pages.

Setup Instructions

Clone the Repository:
git clone https://github.com/your-username/Booking-Engine.git
cd Booking-Engine


Set Up Google Sheets API:

Create a Google Cloud project and enable the Google Sheets API.
Generate an API key in the Google Cloud Console.
Create a Google Sheet and note its ID (from the URL: https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID).
Share the sheet with "Anyone with the link" as Editor.
Update public/script.js with YOUR_SPREADSHEET_ID and YOUR_API_KEY.


Set Up EmailJS:

Sign up at EmailJS and create a service (e.g., Gmail).
Create an email template with fields: name, email, roomName, bookingType, checkIn, adults, children, price, message.
Note your User ID, Service ID, and Template ID.
Update public/script.js with YOUR_EMAILJS_USER_ID, YOUR_SERVICE_ID, and YOUR_TEMPLATE_ID.


Set Up Razorpay:

Sign up at Razorpay and get your Key ID and Key Secret.
Update public/script.js with YOUR_RAZORPAY_KEY_ID.
Note: Razorpay requires a backend for creating orders in production; this demo uses client-side checkout for simplicity.


Add Assets:

Add room images (deluxe-room.jpg, suite-room.jpg) and videos (deluxe-video.mp4, suite-video.mp4) to public/assets/.
Replace placeholder assets with actual room photos/videos.


Test Locally:

Open public/hourly.html or public/nightly.html in a browser.
Select a room, proceed to payment, enter details, and test the Razorpay checkout.
Verify Google Sheet updates and email delivery.


Deploy to GitHub Pages:

Push to GitHub:git add .
git commit -m "Serverless booking engine with Razorpay"
git push origin main


Enable GitHub Pages in repository settings, selecting main branch and / (root) folder.
Access at https://your-username.github.io/Booking-Engine.



Usage

Navigate to hourly.html or nightly.html to select a room.
View room photos/videos and click "Select Room" to proceed.
On payment.html, enter name, adults, children, mobile, and check-in time.
Complete payment via Razorpay; booking is saved to Google Sheets, and a confirmation email is sent.

Notes

Assets: Replace placeholder images/videos in public/assets/ with actual content.
Security: Google Sheets API key and EmailJS IDs are safe for client-side use, but restrict API key scope to Sheets API. Razorpay client-side checkout is for demo; production requires a backend for order creation.
Limitations: Publicly editable Google Sheet is less secure. Consider a backend for production.
Enhancements: Add booking conflict checks, more room types, or Canva-inspired design elements.
Razorpay: Free tier is sufficient for testing; check pricing for production use.
