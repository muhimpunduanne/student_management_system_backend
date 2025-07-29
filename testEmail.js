// testEmail.js
require('dotenv').config();
const sendOtp = require('./src/utils/sendOtp'); 

const testEmail = 'muhimpunduan@gmail.com';  
const testOtp = '123456';

sendOtp(testEmail, testOtp)
  .then(() => console.log('OTP sent successfully!'))
  .catch((err) => console.error('Error sending OTP:', err));
