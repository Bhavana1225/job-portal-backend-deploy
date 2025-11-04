// backend/routes/addJobs.js
const express = require("express");
const Job = require("../models/job");

const router = express.Router();

const jobsToAdd = [
  {
    title: "Frontend Developer",
    company: "TechSoft Solutions",
    location: "Mumbai, India",
    description: "Develop user interfaces using React.js and modern frontend technologies.",
    requirements: ["HTML", "CSS", "JavaScript", "React"],
    salary: "₹70,000 - ₹90,000",
    deadline: new Date("2026-09-15"),
  },
  {
    title: "Backend Developer",
    company: "CodeCrafters Inc",
    location: "Bangalore, India",
    description: "Build APIs and manage databases.",
    requirements: ["Node.js", "Express", "MongoDB"],
    salary: "₹80,000 - ₹1,00,000",
    deadline: new Date("2026-10-10"),
  },
  {
    title: "UI/UX Designer",
    company: "Creative Minds Studio",
    location: "Delhi, India",
    description: "Design intuitive user experiences.",
    requirements: ["Figma", "Adobe XD", "Wireframing"],
    salary: "₹60,000 - ₹80,000",
    deadline: new Date("2026-08-20"),
  },
  {
    title: "Full Stack Developer",
    company: "NextGen Labs",
    location: "Hyderabad, India",
    description: "Work on both frontend and backend tasks.",
    requirements: ["React", "Node.js", "MongoDB", "Express"],
    salary: "₹90,000 - ₹1,20,000",
    deadline: new Date("2026-11-05"),
  },
  {
    title: "Data Analyst",
    company: "Insight Analytics",
    location: "Chennai, India",
    description: "Analyze data and generate actionable insights.",
    requirements: ["SQL", "Python", "Excel", "Data Visualization"],
    salary: "₹65,000 - ₹85,000",
    deadline: new Date("2026-12-01"),
  },
  {
    title: "DevOps Engineer",
    company: "CloudOps Pvt Ltd",
    location: "Pune, India",
    description: "Manage deployment pipelines and infrastructure.",
    requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    salary: "₹1,00,000 - ₹1,30,000",
    deadline: new Date("2026-10-25"),
  },
  {
    title: "React Developer",
    company: "Frontend Masters",
    location: "Kolkata, India",
    description: "Develop high-quality React applications.",
    requirements: ["React", "Redux", "JavaScript"],
    salary: "₹75,000 - ₹95,000",
    deadline: new Date("2026-09-30"),
  },
  {
    title: "Software Engineer",
    company: "TechWorks India",
    location: "Ahmedabad, India",
    description: "Work on software design, development, and testing.",
    requirements: ["Java", "Python", "C++"],
    salary: "₹80,000 - ₹1,10,000",
    deadline: new Date("2026-11-15"),
  },
  {
    title: "QA Tester",
    company: "QualityFirst Labs",
    location: "Bangalore, India",
    description: "Perform manual and automated testing for applications.",
    requirements: ["Selenium", "Postman", "Test Cases"],
    salary: "₹50,000 - ₹70,000",
    deadline: new Date("2026-12-10"),
  },
  {
    title: "Product Manager",
    company: "InnovateX Solutions",
    location: "Delhi, India",
    description: "Oversee product development and strategy.",
    requirements: ["Agile", "Scrum", "Project Management"],
    salary: "₹1,20,000 - ₹1,50,000",
    deadline: new Date("2026-10-05"),
  }
];

router.post("/add-predefined", async (req, res) => {
  try {
    const addedJobs = await Job.insertMany(jobsToAdd);
    res.status(201).json({ message: "Predefined jobs added", jobs: addedJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
