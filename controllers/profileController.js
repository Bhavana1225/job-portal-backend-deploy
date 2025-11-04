const User = require("../models/User");

// GET profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE profile
const updateProfile = async (req, res) => {
  try {
    const { name, email, skills, experience, education, certifications } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (skills) user.skills = Array.isArray(skills) ? skills : skills.split(",");
    if (experience) user.experience = experience;
    if (education) user.education = education;
    if (certifications) user.certifications = certifications;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getProfile, updateProfile };
