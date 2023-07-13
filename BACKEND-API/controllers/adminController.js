const Job = require('../models/jobModel');
const asyncHandler = require('express-async-handler');

// Get all jobs
const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.render('admin', { jobs: jobs });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single job
const getJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }
     res.render('edit-job', { job });
    // res.status(200).json(job);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Edit job
const editJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body);

    if (!updatedJob) {
      return res.status(400).json({ message: `Cannot find the job with ID ${id}` });
    }
    res.redirect(`/jobs/${id}/edit-job`);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a job
const deleteJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    res.redirect('/');
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get the edit job form
const getEditJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }
    res.render('edit-job', { job });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a job
const updateJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body);
    res.redirect(`/jobs/${id}`);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a job
const createJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.redirect(`/jobs/${job._id}`);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});


module.exports = {
  getJobs,
  getJob,
  editJob,
  deleteJob,
  createJob,
  getEditJob,
  updateJob
};