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
router.get('/', getJobs);
router.post('/', createJob);
router.get('/:id', getJob);
router.get('/:id/edit', getEditJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;