const express = require("express");
const {
  register,
  verifyOtp,
  login,
  getProfile,
  getAllUsers,
  createAdmin,
  createUserByAdmin,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = express.Router();

router.post("/register", register);
router.post("/verifyOtp", verifyOtp);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/profile", authMiddleware, getProfile);
router.get("/getAllUsers", authMiddleware, authorizeRoles("ADMIN"), getAllUsers);
router.post("/create-admin", authMiddleware, authorizeRoles("ADMIN"), createAdmin);
router.post("/admin/create-student", authMiddleware, authorizeRoles("ADMIN"), createUserByAdmin);
router.put("/:id", authMiddleware, authorizeRoles("ADMIN"), updateUser);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteUser);

module.exports = router;
