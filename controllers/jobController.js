const Job = require("../models/jobModel");
const asyncHandler = require("express-async-handler");

// Allowed job types
const allowedTypes = ["Full-time", "Part-time", "Internship", "Contract"];

// @desc    Get all jobs (public)
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({});
  res.json(jobs);
});

// @desc    Get a single job by ID (public)
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  res.json(job);
});

// @desc    Create a new job (employer only)
const createJob = asyncHandler(async (req, res) => {
  let { title, description, requirements, location, company, type, deadline } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Title and description are required");
  }

  // Validate type
  if (!allowedTypes.includes(type)) type = "Full-time";

  const job = await Job.create({
    title,
    description,
    requirements: Array.isArray(requirements) ? requirements : [requirements],
    location,
    company,
    type,
    deadline,
    employer: req.user._id,
    filled: false,
  });

  res.status(201).json(job);
});

// @desc    Update a job (employer only)
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  if (job.employer.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  let { title, description, requirements, location, company, type, deadline, filled } = req.body;

  job.title = title || job.title;
  job.description = description || job.description;
  job.requirements = requirements ? (Array.isArray(requirements) ? requirements : [requirements]) : job.requirements;
  job.location = location || job.location;
  job.company = company || job.company;
  job.type = allowedTypes.includes(type) ? type : job.type;
  job.deadline = deadline || job.deadline;
  if (typeof filled === "boolean") job.filled = filled;

  const updatedJob = await job.save();
  res.json(updatedJob);
});

// @desc    Delete a job (employer only)
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  if (job.employer.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job removed successfully" });
});

// @desc    Toggle job filled status (employer only)
const toggleJobFilled = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  if (job.employer.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  job.filled = !job.filled;
  const updatedJob = await job.save();
  res.json(updatedJob);
});

// @desc    Get jobs for logged-in employer
const getEmployerJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ employer: req.user._id });
  res.json(jobs);
});

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  toggleJobFilled,
  getEmployerJobs,
};
