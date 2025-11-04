const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }], // now array
    location: { type: String },
    company: { type: String },
    type: { type: String },
    filled: { type: Boolean, default: false },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deadline: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);
