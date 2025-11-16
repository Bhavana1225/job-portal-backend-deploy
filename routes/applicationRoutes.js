const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware");
const upload = require("../config/multer-cloudinary");

const {
  createApplication,
  getMyApplications,
  updateApplication,
  deleteApplication
} = require("../controllers/applicationController");

router.post("/:jobId", protect, upload.single("resume"), createApplication);

router.get("/me", protect, getMyApplications);

router.put("/:id", protect, upload.single("resume"), updateApplication);

router.delete("/:id", protect, deleteApplication);

module.exports = router;
