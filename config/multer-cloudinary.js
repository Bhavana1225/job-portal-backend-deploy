const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "job_portal_resumes",
    resource_type: "raw",            // 🔥 ensures PDF/DOC/DOCX are handled correctly
    use_filename: true,
    unique_filename: false,
  },
});

const upload = multer({ storage });

module.exports = upload;
