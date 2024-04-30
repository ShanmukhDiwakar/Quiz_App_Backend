const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const firebase = require("firebase/app");
const path = require("path");
const User = require("./models/user");
const cors = require("cors");
require("firebase/auth");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const serviceAccount = require("./firebase-creds.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: "AIzaSyD7flbbc7cEIR9xY9jAU0Li6pOyh5w4S6A",
  authDomain: "quiz-app-73d98.firebaseapp.com",
  projectId: "quiz-app-73d98",
  storageBucket: "quiz-app-73d98.appspot.com",
  messagingSenderId: "939415282270",
  appId: "1:939415282270:web:d668b22947190670b8cacf",
  measurementId: "G-E6G7JHVED2",
};

firebase.initializeApp(firebaseConfig);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("Final_Home");
});

app.get("/login", (req, res) => {
  res.render("Login");
});

app.get("/signup", (req, res) => {
  res.render("Signup");
});

app.get("/student", (req, res) => {
  res.render("student_index");
});

app.get("/teacher", (req, res) => {
  res.render("teacher_index");
});

app.get("/student/edit-profile", (req, res) => {
  res.render("student_profile");
});

app.get("/student/quiz", (req, res) => {
  res.render("student_quiz");
});

app.get("/student/instructions", (req, res) => {
  res.render("student_instructions");
});

app.get("/student/exam", (req, res) => {
  res.render("student_exam");
});

app.get("/student/report", (req, res) => {
  res.render("student_report");
});

app.get("/faculty", (req, res) => {
  res.render("faculty_index");
});

app.get("/faculty/view-report", (req, res) => {
  res.render("faculty_viewport");
});

app.get("/faculty/course", (req, res) => {
  res.render("faculty_course");
});

app.get("/faculty/profile", (req, res) => {
  res.render("faculty_profile");
});

app.get("/faculty/quiz", (req, res) => {
  res.render("faculty_quiz");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    const userData = {
      username: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      graduationYear: req.body.graduationYear,
      dob: req.body.dob,
    };
    const user = new User(userData);
    await user.save();
    console.log(req.body);
    res.redirect("/login");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: "Failed to register user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);
    const userRecord = await admin.auth().getUserByEmail(email);
    res.render("student_index");
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(401).json({ error: "Invalid email or password" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
