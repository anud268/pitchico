require('dotenv').config();
const nimbuspostService = require('./src/services/nimbuspostService');

const runTest = async () => {
  const fakeOrder = {
    orderId: "TEST-" + Math.floor(1000 + Math.random() * 9000),
    paymentMethod: "cod",
    totalAmount: 149,
    customer: {
      name: "Test User",
      email: "test@example.com",
      phone: "9876543210"
    },
    shipping: {
      address: "Para, Elappully",
      city: "Palakkad",
      state: "Kerala",
      pincode: "678622"
    },
    items: [
      { name: "Dishwashing Hand Gloves", quantity: 1, price: 149, productId: "p4" }
    ]
  };

  console.log("Pushing Test Order to NimbusPost...");
  const result = await nimbuspostService.createShipment(fakeOrder);
  console.log("NimbusPost Result:", JSON.stringify(result, null, 2));
};

runTest();
