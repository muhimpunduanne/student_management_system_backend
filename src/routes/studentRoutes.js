const express = require("express");
const router = express.Router(); 

const { updateStudentProfile } = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.put("/profile", authMiddleware, updateStudentProfile);

module.exports = router;
