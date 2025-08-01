const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/authMiddleware');

let courses = [];

// GET all courses (protected)
router.get('/', authMiddleware, (req, res) => {
  res.json(courses);
});

// POST create course (protected)
router.post('/create', authMiddleware, (req, res) => {
  const { title, code, description } = req.body;
  if (!title || !code) {
    return res.status(400).json({ message: 'Title and code are required' });
  }

  const newCourse = {
    id: uuidv4(),
    title,
    code,
    description: description || ''
  };

  courses.push(newCourse);
  res.status(201).json({ course: newCourse });
});

// DELETE course by ID (protected)
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = courses.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }

  courses.splice(index, 1);
  res.json({ message: 'Course deleted' });
});

module.exports = router;
