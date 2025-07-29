// testEmail.js
require('dotenv').config();
const sendOtp = require('./src/utils/sendOtp'); // adjust path if needed

const testEmail = 'muhimpunduan@gmail.com';  // <-- Replace with your real email here
const testOtp = '123456';

sendOtp(testEmail, testOtp)
  .then(() => console.log('OTP sent successfully!'))
  .catch((err) => console.error('Error sending OTP:', err));
