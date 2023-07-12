const express = require('express');
const Job = require('../models/jobModel');
const {
  getJobs,
  getJob,
  editJob,
  deleteJob,
  createJob,
  getEditJob,
  updateJob
} = require('../controllers/adminController');

const router = express.Router();

// Assuming you're using Express.js
router.get('/jobs', getJobs);
router.post('/jobs', createJob);
router.get('/jobs/:id', getJob);
router.get('/jobs/:id/edit', getEditJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

module.exports = router;