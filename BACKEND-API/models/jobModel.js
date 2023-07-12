const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        jobName: { 
            type: String,
            required: [true, 'name is required']
        },
        description: {
            type: String
            
        },
        requirement: {
            type: String,
            required: [true, 'requirement required'] 
        }
    },
    {
        Timestamp:true
    }
)

const job = mongoose.model('job', jobSchema);
module.exports = job;