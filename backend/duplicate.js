const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
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
  full_name: String,
  email: String,
  phone_number: String,
  linkedin: String,
  github: String,
});
const User = mongoose.model("User", userSchema);

// 🔹 Google Forms API Authentication
const auth = new google.auth.GoogleAuth({
  keyFile: "google-service.json",
  scopes: ["https://www.googleapis.com/auth/forms.responses.readonly"],
});
const forms = google.forms({ version: "v1", auth });

// Replace with your actual Google Form ID
const FORM_ID = "1bDMyFohP8JRPt5osU_nM40GPpVkA09JWwXq79Lnqb90";

// 🔹 Fetch Google Forms Responses
app.get("/api/responses", async (req, res) => {
  try {
    const response = await forms.forms.responses.list({ formId: FORM_ID });
    res.json(response.data.responses);
  } catch (error) {
    console.error("❌ Error fetching responses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 User Registration API
app.post("/api/register", async (req, res) => {
  const { full_name, email, phone_number, linkedin, github } = req.body;

  // 🔹 Validate Required Fields
  if (!full_name || !email || !phone_number) {
    return res.status(400).json({ message: "❌ Missing required fields" });
  }

  try {
    // 🔹 Check for Duplicate Registration in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "❌ User already registered!" });
    }

    // 🔹 Save to MongoDB
    const newUser = new User({ full_name, email, phone_number, linkedin, github });
    await newUser.save();

    res.json({ message: "✅ Registration successful!" });
  } catch (error) {
    console.error("❌ Error validating registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
