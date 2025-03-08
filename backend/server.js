const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Connect to MongoDB
mongoose.connect(process.env.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => console.log("✅ Connected to MongoDB"));

// 🔹 Define User Schema
const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    college_name: { type: String, required: true },
    degree: { type: String, enum: ["B.Tech", "M.Tech", "Other"], required: true },
    year_of_study: { type: String, enum: ["1st", "2nd", "3rd", "4th"], required: true },
    cgpa: { type: Number, required: true },
    tech_stack: { type: Object, required: true }, // JSON format
    other_skills: { type: String },
    project_idea: { type: String, minlength: 50 },
    linkedin: { type: String },
    github: { type: String },
  });
const User = mongoose.model("User", userSchema);

// 🔹 Fetch all user responses from MongoDB
app.get("/api/responses", async (req, res) => {
    try {
        const responses = await User.find(); // Fetch all registered users
        res.json(responses);
    } catch (error) {
        console.error("❌ Error fetching responses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/api/register", async (req, res) => {
    const { full_name, email, phone_number, college_name, degree, year_of_study, cgpa, tech_stack, other_skills, project_idea, linkedin, github } = req.body;
  
    // Validate Required Fields
    if (!full_name || !email || !phone_number || !college_name || !degree || !year_of_study || !cgpa) {
      return res.status(400).json({ message: "❌ Missing required fields" });
    }
  
    try {
      // Check for Duplicate Registration
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "❌ User already registered!" });
      }
  
      // Find last user_id and increment
      const lastUser = await User.findOne().sort({ user_id: -1 });
      const newUserId = lastUser ? lastUser.user_id + 1 : 1; // Start from 1
  
      // Save to MongoDB
      const newUser = new User({
        user_id: newUserId, // Ensure user_id is set
        full_name,
        email,
        phone_number,
        college_name,
        degree,
        year_of_study,
        cgpa,
        tech_stack,
        other_skills,
        project_idea,
        linkedin,
        github
      });
  
      await newUser.save();
      res.json({ message: "✅ Registration successful!", user_id: newUserId });
  
    } catch (error) {
      console.error("❌ Error registering user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  

// 🔹 Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
