require('dotenv').config();
const axios = require('axios');

const run = async () => {
  const res = await axios.post('https://api.nimbuspost.com/v1/users/login', {
    email: process.env.NIMBUSPOST_EMAIL,
    password: process.env.NIMBUSPOST_PASSWORD
  });
  console.log(JSON.stringify(res.data, null, 2));
}
run();
