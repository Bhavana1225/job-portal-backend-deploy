const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String },
  location: { type: String },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deadline: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);
