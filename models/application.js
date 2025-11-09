const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume: { type: String, required: true },
    status: {
      type: String,
      enum: ["applied", "reviewed", "rejected", "accepted"],
      default: "applied",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Application || mongoose.model("Application", applicationSchema);
