const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "job_portal_resumes",
      resource_type: "raw",               // ✅ PDFs/DOCs
      public_id: Date.now() + "-" + file.originalname, // unique
      format: file.originalname.split(".").pop(),      // preserves extension
    };
  },
});

const upload = multer({ storage });

module.exports = upload;

