const express = require('express');
const Job = require('../models/jobModel');
const {getJobs, getJob, editJob, deleteJob, createJob} = require('../controllers/jobController');

const router = express.Router();


router.get("/", getJobs);
router.get("/:id", getJob);
router.put("/:id", editJob);
router.delete("/:id", deleteJob);
router.post('/', createJob) 

module.exports = router; 