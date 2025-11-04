const Application = require("../models/application");
const Job = require("../models/jobModel");

// Apply for a job
const applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { name, email } = req.body;
    const userId = req.user._id;

    if (!jobId) return res.status(400).json({ message: "Job ID is required." });
    if (!req.file) return res.status(400).json({ message: "Resume is required." });
    if (!name || !email) return res.status(400).json({ message: "Name and email are required." });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });

    const existingApp = await Application.findOne({ job: jobId, user: userId });
    if (existingApp) return res.status(400).json({ message: "You have already applied for this job." });

    const application = new Application({
      job: jobId,
      user: userId,
      name,
      email,
      resume: req.file.filename,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error("Error in applyJob:", error);
    res.status(500).json({ message: "Failed to apply for job", error: error.message });
  }
};

// Get all applications of user
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).populate("job");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};

// Update application
const updateApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { name, email } = req.body;

    const application = await Application.findOne({ _id: applicationId, user: req.user._id });
    if (!application) return res.status(404).json({ message: "Application not found" });

    if (name) application.name = name;
    if (email) application.email = email;
    if (req.file) application.resume = req.file.filename;

    await application.save();
    res.status(200).json({ message: "Application updated successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Failed to update application", error: error.message });
  }
};

// Delete application
const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await Application.findOneAndDelete({ _id: applicationId, user: req.user._id });
    if (!application) return res.status(404).json({ message: "Application not found" });

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete application", error: error.message });
  }
};

module.exports = { applyJob, getUserApplications, updateApplication, deleteApplication };
