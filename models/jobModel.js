import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    requirements:[{
        type:String
    }],
    salary:{
        type:String,
        required:true
    },
    experience:{
        type:Number
    },
    location:{
        type:String
    },
    jobType:{
        type:String
    },
    position:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application',
    }]
    },{timestamps:true});

const Job = mongoose.model("Job",jobSchema);    
export default Job;