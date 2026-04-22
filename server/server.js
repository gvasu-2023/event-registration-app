require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Registration = require("./models/Registration");

const app = express();

app.use(cors({
  origin: "https://events-urk23cs7130-vasu.vercel.app"
}));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.post("/register", async (req, res) => {
  try {
    const registration = new Registration(req.body);

    await registration.save();

    res.status(201).json({
      message: "Registration Successful"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error saving registration"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});