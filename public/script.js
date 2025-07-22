(function() {
    emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your EmailJS User ID
})();

let selectedRoom = null;

function selectRoom(roomName, price, bookingType) {
    selectedRoom = { roomName, price, bookingType };
    const duration = bookingType === 'hourly' ? 'hour' : 'night';
    localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
    window.location.href = 'payment.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        const bookingSummary = document.getElementById('bookingSummary');
        selectedRoom = JSON.parse(localStorage.getItem('selectedRoom'));
        if (selectedRoom) {
            bookingSummary.textContent = `Room: ${selectedRoom.roomName}, Type: ${selectedRoom.bookingType}, Price: ₹${selectedRoom.price}/${selectedRoom.bookingType === 'hourly' ? 'hour' : 'night'}`;
        }

        paymentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageEl = document.getElementById('message');
            const formData = new FormData(e.target);
            const data = {
                name: formData.get('name'),
                adults: formData.get('adults'),
                children: formData.get('children'),
                mobile: formData.get('mobile'),
                checkIn: formData.get('checkIn'),
                roomName: selectedRoom?.roomName,
                bookingType: selectedRoom?.bookingType,
                price: selectedRoom?.price
            };

            try {
                // Save to Google Sheets
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/Sheet1!A:G:append?valueInputOption=RAW&key=YOUR_API_KEY`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            values: [[data.name, data.adults, data.children, data.mobile, data.checkIn, data.roomName, data.bookingType]]
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    }
                );

                if (!response.ok) throw new Error('Failed to save booking to Google Sheets');

                // Send email via EmailJS
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    name: data.name,
                    email: data.mobile + '@example.com', // EmailJS requires an email; use mobile as placeholder
                    roomName: data.roomName,
                    bookingType: data.bookingType,
                    checkIn: data.checkIn,
                    adults: data.adults,
                    children: data.children,
                    price: data.price,
                    message: `Dear ${data.name},\n\nYour ${data.bookingType} booking for ${data.roomName} on ${data.checkIn} has been confirmed.\nAdults: ${data.adults}, Children: ${data.children}, Price: ₹${data.price}.\n\nThank you for choosing Stylish Haven Hotel!`
                });

                // Razorpay Payment
                const options = {
                    key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
                    amount: data.price * 100, // Razorpay expects amount in paise
                    currency: 'INR',
                    name: 'Stylish Haven Hotel',
                    description: `${data.bookingType} Booking for ${data.roomName}`,
                    handler: function (response) {
                        messageEl.textContent = `Payment successful! Booking confirmed. Payment ID: ${response.razorpay_payment_id}`;
                        localStorage.removeItem('selectedRoom');
                        paymentForm.reset();
                    },
                    prefill: {
                        name: data.name,
                        contact: data.mobile
                    },
                    theme: { color: '#1e3a8a' }
                };
                const rzp = new Razorpay(options);
                rzp.open();

            } catch (error) {
                console.error('Error:', error);
                messageEl.textContent = 'Error processing booking. Please try again.';
            }
        });
    }
});
