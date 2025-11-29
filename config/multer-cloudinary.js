const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "job_portal_resumes",
    resource_type: "raw",                      // ✅ for PDFs/DOCs
    public_id: Date.now() + "-" + file.originalname,
    format: file.originalname.split(".").pop(), // keeps original extension
  }),
});

const upload = multer({ storage });

module.exports = upload;
