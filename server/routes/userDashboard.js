// routes/dashboardRoute.js
const express = require('express');
const router = express.Router();
const ExamAttempted = require('../models/ExamAttempted');

// Total exams attempted
router.get('/exams/:userId', async (req, res) => {
  try {
    const total = await ExamAttempted.countDocuments({ examineeId: req.params.userId });
    res.json(total);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch total exams' });
  }
});

// Passed exams
router.get('/passed/:userId', async (req, res) => {
  try {
    const passed = await ExamAttempted.countDocuments({
      examineeId: req.params.userId,
      status: 'Passed',
    });
    res.json(passed);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch passed exams' });
  }
});

module.exports = router;
