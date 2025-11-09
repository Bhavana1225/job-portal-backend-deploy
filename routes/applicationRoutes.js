const express = require("express");
const router = express.Router();
const upload = require("../config/multer-cloudinary");
const {
  applyJob,
  getUserApplications,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");
const { protect } = require("../middleware/authmiddleware");

router.post("/:jobId/apply", protect, upload.single("resume"), applyJob);
router.get("/me", protect, getUserApplications);
router.put("/:applicationId", protect, upload.single("resume"), updateApplication);
router.delete("/:applicationId", protect, deleteApplication);

module.exports = router;
