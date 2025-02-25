import getDataUri from "../utils/Datauri.js"
import cloudinary from "../utils/cloudinary.js"
import { company } from "../models/company.model.js"

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false })
    }
    let existingCompany = await company.findOne({ name: companyName })
    if (existingCompany) {
      return res
        .status(400)
        .json({ message: "Company already exists", success: false })
    }
    const newCompany = await company.create({
      name: companyName,
      userId: req.id,
    })
    return res.status(201).json({
      message: "Company registered successfully",
      company: newCompany,
      success: true,
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}

export const getCompany = async (req, res) => {
  try {
    const companies = await company.find({ userId: req.id })
    if (!companies) {
      return res
        .status(404)
        .json({ message: "No company found", success: false })
    }
    return res.status(200).json({ companies, success: true })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}

// export const getCompanyById = async (req, res) => {
//   try {
//     const company = await company.findById(req.params.id)
//     console.log("Fetching company with ID:", req.params.id)
//     if (!updateCompany) {
//       return res
//         .status(404)
//         .json({ message: "Company not found", success: false })
//     }
//     return res.status(200).json({ company, success: true })
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Something went wrong", success: false })
//   }
// }

export const getCompanyById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("Fetching company with ID:", id);
    const companyData = await company.findById(id); // Avoid variable name conflict

    if (!companyData) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.status(200).json({ success: true, company: companyData });
  } catch (error) {
    console.error("🔥 Backend Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const updateCompany = async (req, res) => {
  try {
    const { name, description, location, website } = req.body
    const file = req.file
    let logo = null
    if (file) {
      try {
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri)
        logo = cloudResponse.secure_url
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError)
        return res
          .status(500)
          .json({ message: "File upload failed", success: false })
      }
    }

    const updateData = { name, description, location, website, logo }

    const updatedCompany = await company.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    )
    // console.log(" update")
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false })
    }

    return res.status(200).json({
      message: "Company information updated",
      company: updatedCompany,
      success: true,
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}
