const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOtp = require("../utils/sendOtp");

const prisma = new PrismaClient();

const register = async ({ email, password }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60000); 

  await sendOtp(email, otp);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    },
  });

  return "OTP sent to your email";
};

const verifyOtp = async ({ email, otp }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.verified) throw new Error("Invalid request or already verified");

  if (user.otp !== otp || user.otpExpiry < new Date()) {
    throw new Error("Invalid or expired OTP");
  }

  await prisma.user.update({
    where: { email },
    data: {
      verified: true,
      otp: null,
      otpExpiry: null,
    },
  });

  return "OTP verified. You can now login.";
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.verified) throw new Error("Invalid credentials or user not verified");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return { token };
};

const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  return { email: user.email, createdAt: user.createdAt };
};

module.exports = {
  register,
  verifyOtp,
  login,
  getProfile,
};
