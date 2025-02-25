import { Job } from "../models/job.model.js"
import { Application } from "../models/application.model.js"
export const applyJob = async (req, res) => {
  try {
    const userId = req.id
    const jobId = req.params.id
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job id is required", success: false })
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    })

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      })
    }
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false })
    }
    //create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    })
    job.applications.push(newApplication._id)
    await job.save()
    return res
      .status(201)
      .json({ message: "Applied successfully", success: true })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", sort: { createdAt: -1 } },
      })
    if (!applications) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false })
    }
    return res.status(200).json({ applications, success: true })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
};

//no of users applied for a job
export const getApplicants= async (req, res) => {
  try {
    const jobId = req.params.id
    const job = await Job.findById(jobId).populate({
      path:"applications",
      options:{sort:{createdAt:-1}},
      populate:{path:"applicant"}
    })
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false })
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}

export const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id
    const {status} = req.body
    if(!status){
      return res.status(400).json({ message: "Status is required", success: false });
    }   

    const application = await Application.findOne({_id:applicationId});
    if(!application){
      return res.status(404).json({ message: "Application not found", success: false });
    }

    application.status = status.toLowerCase();
    await application.save()
    
    return res.status(200).json({ message: "Status updated successfully", success: true });
  } catch (error) { 
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}
