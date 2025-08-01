const sendEmail = require("./src/utils/sendEmail");

sendEmail("muhimpunduan@gmail.com", "Test Reset Link", "This is a test email from Student Management System.")
  .then(() => console.log("Test email sent"))
  .catch((err) => console.error("Test email failed", err));
