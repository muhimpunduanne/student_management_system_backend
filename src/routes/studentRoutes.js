const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const studentController = require('../controllers/studentController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.put(
  '/student/profile',
  authMiddleware,
  upload.single('profilePicture'), 
  studentController.updateStudentProfile
);

module.exports = router;
