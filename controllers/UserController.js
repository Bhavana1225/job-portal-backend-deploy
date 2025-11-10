const User = require("../models/User");

exports.updateProfile = async function (req, res) {
  try {
    const userId = req.user.id;

    const { name, email, contact, skills, experience, education } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, contact, skills, experience, education },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
