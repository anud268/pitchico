const nodemailer = require('nodemailer');

const sendOrderEmail = async (orderData) => {
    try {
        // Create reusable transporter object using SSL/TLS
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        });

        // Formulate Order Text
        const itemsList = orderData.items.map((item, i) => {
            return `📍 ITEM ${i + 1}:
  - Product: ${item.name}
  - Quantity: ${item.quantity}
  - Price: Rs. ${item.price}
  - Image: ${item.image || 'N/A'}`;
        }).join('\n\n');

        const messageBody = `
🌟 PITCHICO NEW ORDER RECEIVED 🌟
--------------------------------------
Order Reference: #${orderData.orderId}
Order Date: ${new Date().toLocaleString()}

💰 ORDER SUMMARY
--------------------------------------
Grand Total: Rs. ${orderData.totalAmount}
Payment Method: ${orderData.paymentMethod}

👤 CUSTOMER DETAILS
--------------------------------------
Name: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
Email: ${orderData.customer.email}

📦 SHIPPING ADDRESS
--------------------------------------
Address: ${orderData.shipping.address}
City: ${orderData.shipping.city}
Pincode: ${orderData.shipping.pincode}

🛒 PRODUCTS ACQUIRED
--------------------------------------
${itemsList}

--------------------------------------
System Generated Email from Pitchico NextGen.
        `;

        // Send Email
        const info = await transporter.sendMail({
            from: `<${process.env.EMAIL_USER}>`, 
            to: "admin.pitchico@gmail.com", // TARGET EMAIL
            subject: `🎉 New Order Received! [#${orderData.orderId}] - Rs.${orderData.totalAmount}`, 
            text: messageBody
        });

        console.log("Order Email Sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Order Email Error:", error);
        return false;
    }
};

module.exports = {
    sendOrderEmail
};
