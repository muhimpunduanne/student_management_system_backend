
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    await transporter.sendMail({
      from: `"Student System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log(" Email sent successfully to:", to);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

