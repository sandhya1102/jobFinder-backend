import Company from "../models/companyModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Can't register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company registered seccessfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error in registerCompany:", error.message);
    return res.status(500).json({
      message: "Server error while registering company",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    console.log("Fetched companies:", companies); 

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error("Error in getCompany:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching companies",
    });
  }
};

export const getCompanyId = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const updateData = { name, description, website, location };

    // If file is provided, upload to cloudinary and add logo URL
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error updating company:", error);
    return res.status(500).json({
      message: "Something went wrong while updating.",
      success: false,
    });
  }
};
