import { Job } from "../models/job.model.js"
//admin
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      jobType,
      salary,
      companyId,
      experience,
      position,
    } = req.body
    const userId = req.id

    if (
      !title ||
      !description ||
      !location ||
      !jobType ||
      !salary ||
      !companyId ||
      !experience ||
      !position ||
      !requirements
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all fields", success: false })
    }

    const job = await Job.create({
      title,
      description,
      location,
      jobType,
      salary: Number(salary),
      company: companyId,
      experienceLevel: experience,
      position,
      requirements: requirements.split(","), // Convert requirements to array
      created_by: userId,
    })
    return res
      .status(201)
      .json({ message: "New job created successfully", job, success: true })
  } catch (error) {
    console.error("Error in postJob API:", error) // Log error details
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}

//students
export const getAllJobs = async (req, res) => {
  try {
    const { keywords } = req.query // ✅ Extract search query

    let jobs
    if (keywords) {
      jobs = await Job.find({
        title: { $regex: keywords, $options: "i" }, // ✅ Case-insensitive search
      }).populate("company")
    } else {
      jobs = await Job.find().populate("company")
    }

    // console.log("Filtered Jobs:", jobs)
    res.status(200).json({ success: true, jobs })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

//students
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id
    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
      })
      .populate("company")
      .populate("created_by")
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false })
    }
    return res.status(200).json({ job, success: true })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}

//admin ,JOBS CREATED BY THE COMPANY
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    })
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false })
    }
    return res.status(200).json({ jobs, success: true })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}
