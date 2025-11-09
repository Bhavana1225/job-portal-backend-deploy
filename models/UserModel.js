const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, default: "" },
    skills: { type: String, default: "" },
    experience: { type: String, default: "" },
    education: { type: String, default: "" },
    role: { type: String, enum: ["jobseeker", "employer"], required: true },
  },
  { timestamps: true }
);

// ✅ FIX – avoid overwrite error
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
