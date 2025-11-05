const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../utils/generateToken");

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, contact, skills, experience, education } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, role, contact, skills, experience, education });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    contact: user.contact,
    skills: user.skills,
    experience: user.experience,
    education: user.education,
    token: generateToken(user._id),
  });
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.password === password) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contact: user.contact,
      skills: user.skills,
      experience: user.experience,
      education: user.education,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contact: user.contact,
      skills: user.skills,
      experience: user.experience,
      education: user.education,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.contact = req.body.contact || user.contact;
    user.skills = req.body.skills || user.skills;
    user.experience = req.body.experience || user.experience;
    user.education = req.body.education || user.education;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      contact: updatedUser.contact,
      skills: updatedUser.skills,
      experience: updatedUser.experience,
      education: updatedUser.education,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
