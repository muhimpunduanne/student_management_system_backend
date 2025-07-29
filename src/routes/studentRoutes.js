const express = require("express");
const router = express.Router(); // ✅ THIS LINE IS MISSING IN YOUR FILE

const { updateStudentProfile } = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddleware");

// Update student profile (phone, profilePicture, course)
router.put("/profile", authMiddleware, updateStudentProfile);

module.exports = router;
