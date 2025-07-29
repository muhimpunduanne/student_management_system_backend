const nodemailer = require("nodemailer");

console.log("Initializing Nodemailer transporter...");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("Nodemailer transporter is ready");
  }
});

module.exports = async (to, otp) => {
  console.log(`Preparing to send OTP ${otp} to email: ${to}`);

  try {
    await transporter.sendMail({
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error; 
  }
};
