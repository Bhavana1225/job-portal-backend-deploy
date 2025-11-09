const Application = require("../models/application");

// ✅ Get logged-in user's applications
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).populate("job");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Apply to job
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, email } = req.body;
    const resume = req.file ? req.file.path : null;

    const application = await Application.create({
      user: req.user._id,
      job: jobId,
      name,
      email,
      resume,
    });

    res.status(201).json({ application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update application
const updateApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId);

    if (!application) return res.status(404).json({ message: "Application not found" });
    if (application.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    if (req.body.name) application.name = req.body.name;
    if (req.body.email) application.email = req.body.email;
    if (req.file) application.resume = req.file.path;

    await application.save();
    res.status(200).json({ application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete application
const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId);

    if (!application) return res.status(404).json({ message: "Application not found" });
    if (application.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    await application.remove();
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUserApplications,
  applyJob,
  updateApplication,
  deleteApplication,
};
