const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getAllJobs = async (req,res)=> {
    const jobs = await Job.find({createdBy: req.user.userId})
    res.status(StatusCodes.OK).json({userName: req.user.name,jobs,count:jobs.length})
}
const getJob = async (req,res)=> {
    const job = await Job.findOne({_id: req.params.id, createdBy:req.user.userId})
    if(!job) {throw new NotFoundError(`no job with that id`)}
    res.status(StatusCodes.OK).json({userName: req.user.name,job})

}
const createJob = async (req,res)=> {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async (req,res)=> {
    const job = await Job.findOneAndUpdate({_id: req.params.id, createdBy:req.user.userId}, req.body,{new:true,runValidators:true})
    if(!job) {throw new NotFoundError(`no job with that id`)}
    res.status(StatusCodes.OK).json({userName: req.user.name,job})
}
const deleteJob = async (req,res)=> {
    const job = await Job.findOneAndDelete({_id: req.params.id, createdBy:req.user.userId})
    if(!job) {throw new NotFoundError(`no job with that id`)}
    res.status(StatusCodes.OK).json({userName: req.user.name,job})
}


module.exports = {getAllJobs,getJob,createJob,updateJob,deleteJob}