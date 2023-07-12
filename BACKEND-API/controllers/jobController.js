const Job = require('../models/jobModel');
const asyncHandler = require('express-async-handler');

//get all jobs
const getJobs = asyncHandler(async(req, res) => {
    try {
        const Joob = await Job.find({});
        res.status(200).json(Joob)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});

//get a single job
const getJob = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const job = await Job.findById(id);
      if (!job) {
        res.status(404);
        throw new Error('Job not found');
      }
      res.render('Jobs', { job });
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
//edit job
const editJob = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const Joob = await Job.findByIdAndUpdate(id, req.body);

        if(!Job){
            return res.status(400).json({message:'cannot find the product with ID ${id}'})
        };
        const updatedJob = await Job.findById(id);
        res.status(200).json(updatedJob);

    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});

//delete a job
const deleteJob = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const Joob = await Job.findByIdAndDelete(id);

        if(!Job){
            res.status(500);
            throw new Error('cannot find the product with ID ${id}')
            //return res.status(400).json({message:})
        };
        res.status(200).json(Job);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});

//add/create a job
const createJob = asyncHandler(async(req, res) =>{
    //  res.send(req.body);
    try {
        const joob = await Job.create(req.body);
        res.status(200).json(joob);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

module.exports = {
    getJobs,
    getJob,
    editJob,
    deleteJob,
    createJob
};