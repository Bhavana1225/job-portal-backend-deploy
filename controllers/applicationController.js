const Application = require("../models/application");
const Job = require("../models/Job");

exports.createApplication = async function (req, res) {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const resumeUrl = req.file ? req.file.path : "";

    const application = await Application.create({
      job: req.params.jobId,
      user: req.user.id,
      name: req.body.name,
      email: req.body.email,
      resume: resumeUrl
    });

    res.status(201).json(application);
  } catch (err) {
    console.error("Create application error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyApplications = async function (req, res) {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate("job")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("Fetch applications error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateApplication = async function (req, res) {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const resumeUrl = req.file ? req.file.path : application.resume;

    application.name = req.body.name || application.name;
    application.email = req.body.email || application.email;
    application.resume = resumeUrl;

    await application.save();

    res.json(application);
  } catch (err) {
    console.error("Update app error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteApplication = async function (req, res) {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    console.error("Delete app error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
