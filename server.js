const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

dotenv.config();
connectDB();

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// CORS setup to allow frontend requests with credentials
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve resumes

// Routes
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/jobs", require("./routes/jobroutes"));
app.use("/api/applications", require("./routes/applicationroutes"));

// ✅ Add the missing users route for profile and updates
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
