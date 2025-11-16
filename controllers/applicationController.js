const Application = require("../models/application");
const Job = require("../models/jobModel");

exports.createApplication = async (req, res) => {
  try {
    const { name, email } = req.body;
    const jobId = req.params.jobId;

    if (!req.file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // ✅ Use Cloudinary URL if available
    const resumeUrl = req.file?.path || req.file?.filename || req.file?.url;

    const application = await Application.create({
      job: jobId,
      user: req.user._id,
      name,
      email,
      resume: resumeUrl,
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Create Application Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate("job");

    res.status(200).json(applications);
  } catch (error) {
    console.error("Get Applications Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    let updateData = {
      name: req.body.name,
      email: req.body.email,
      status: req.body.status,
    };

    if (req.file) {
      // ✅ Use Cloudinary URL if available
      updateData.resume = req.file?.path || req.file?.filename || req.file?.url;
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Application Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted" });
  } catch (error) {
    console.error("Delete Application Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
