const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "job_portal_resumes",
      resource_type: "auto",
      public_id: Date.now() + "-" + file.originalname,   // ✅ IMPORTANT
      format: file.originalname.split(".").pop(),        // ✅ Makes Cloudinary support pdf/doc/docx
    };
  }
});

const upload = multer({ storage });

module.exports = upload;
