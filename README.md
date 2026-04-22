# Mindcraft Event Registration System

A full-stack Event Registration Web Application built using HTML, CSS, jQuery, Node.js, Express, and MongoDB Atlas.

This project allows users to register for events through a web form and stores registration details securely in MongoDB Atlas.

---

# Live Project Architecture

| Component        | Technology        |
| ---------------- | ----------------- |
| Frontend         | HTML, CSS, jQuery |
| Backend          | Node.js + Express |
| Database         | MongoDB Atlas     |
| Frontend Hosting | Vercel            |
| Backend Hosting  | Render            |

---

# Features

* Event registration form
* MongoDB Atlas database integration
* Backend API with Express.js
* AJAX form submission using jQuery
* Responsive UI design
* Cloud deployment using Vercel and Render
* Secure environment variable setup using `.env`
* CORS handling for frontend-backend communication

---

# Project Structure

```plaintext
event-registration-app
│
├── client
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── server
    ├── models
    │   └── Registration.js
    │
    ├── .env
    ├── .gitignore
    ├── package.json
    └── server.js
```

---

# Prerequisites

Install the following before starting:

* Node.js
* Git
* MongoDB Atlas account
* Vercel account
* Render account
* Cursor IDE or VS Code

---

# Step 1 — Clone the Repository

```bash
git clone https://github.com/gvasu-2023/event-registration-app
```

```bash
cd event-registration-app
```

---

# Step 2 — Backend Setup

Move into backend folder:

```bash
cd server
```

Initialize project:

```bash
npm init -y
```

Install dependencies:

```bash
npm install express mongoose cors dotenv nodemon
```

---

# Step 3 — Create Backend Files

Create the following structure:

```plaintext
server
│
├── models
│   └── Registration.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

# Step 4 — Create MongoDB Model

## File: `server/models/Registration.js`

```javascript
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  event: String
});

module.exports = mongoose.model("Registration", registrationSchema);
```

---

# Step 5 — Configure Environment Variables

## File: `server/.env`

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/eventDB?retryWrites=true&w=majority
```

---

# Step 6 — Protect Sensitive Files

## File: `server/.gitignore`

```gitignore
node_modules
.env
```

This prevents sensitive credentials and unnecessary files from being uploaded to GitHub.

---

# Step 7 — Create Backend Server

## File: `server/server.js`

```javascript
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Registration = require("./models/Registration");

const app = express();

app.use(cors({
  origin: "https://YOUR-VERCEL-URL.vercel.app"
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
      message: "Registration Failed"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
```

---

# Step 8 — Setup MongoDB Atlas

## 1. Create Cluster

* Login to MongoDB Atlas
* Create a free cluster
* Choose nearest region
* Wait until cluster becomes active

---

## 2. Create Database User

Go to:

```plaintext
Database Access
```

Create user credentials.

Example:

```plaintext
Username: admin
Password: admin123
```

---

## 3. Configure Network Access

Go to:

```plaintext
Network Access
```

Add:

```plaintext
0.0.0.0/0
```

This allows external connections during development.

---

## 4. Get Connection String

Go to:

```plaintext
Connect → Drivers
```

Copy the MongoDB connection string.

Replace:

```plaintext
<db_password>
```

with your actual password.

Add database name:

```plaintext
eventDB
```

Final format:

```plaintext
mongodb+srv://username:password@cluster.mongodb.net/eventDB?retryWrites=true&w=majority
```

---

# Step 9 — Run Backend Server

Inside server folder:

```bash
node server.js
```

Expected output:

```plaintext
MongoDB Connected
Server running on port 5000
```

---

# Step 10 — Frontend Setup

Inside `client` folder create:

```plaintext
index.html
style.css
script.js
```

---

# Step 11 — Create Frontend HTML

## File: `client/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Mindcraft Event Registration</title>

  <link rel="stylesheet" href="style.css">

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

  <div class="container">

    <h1>Mindcraft Event Registration</h1>

    <form id="registrationForm">

      <input type="text" id="name" placeholder="Enter Name" required>

      <input type="email" id="email" placeholder="Enter Email" required>

      <select id="event">
        <option value="AI Workshop">AI Workshop</option>
        <option value="Hackathon">Hackathon</option>
        <option value="Web Development">Web Development</option>
      </select>

      <button type="submit">Register</button>

    </form>

    <p id="message"></p>

  </div>

  <script src="script.js"></script>

</body>

</html>
```

---

# Step 12 — Create Frontend CSS

## File: `client/style.css`

```css
body {
  font-family: Arial;
  background-color: #0f172a;
  color: white;
  text-align: center;
  margin-top: 100px;
}

.container {
  width: 300px;
  margin: auto;
}

input,
select,
button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
}

button {
  background-color: #22c55e;
  color: white;
  cursor: pointer;
}
```

---

# Step 13 — Create Frontend JavaScript

## File: `client/script.js`

```javascript
$("#registrationForm").submit(function (e) {

  e.preventDefault();

  const data = {
    name: $("#name").val(),
    email: $("#email").val(),
    event: $("#event").val()
  };

  $.ajax({

    url: "https://YOUR-RENDER-BACKEND.onrender.com/register",

    type: "POST",

    contentType: "application/json",

    data: JSON.stringify(data),

    success: function (response) {

      $("#message").text(response.message);

      $("#registrationForm")[0].reset();
    },

    error: function () {

      $("#message").text("Registration Failed");
    }

  });

});
```

---

# Step 14 — Test Application Locally

Open frontend:

```plaintext
client/index.html
```

Fill form and submit.

Check MongoDB Atlas collections to verify data insertion.

---

# Step 15 — Initialize Git Repository

Go to project root:

```bash
git init
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Initial commit"
```

---

# Step 16 — Push to GitHub

Create repository on GitHub.

Connect remote:

```bash
git remote add origin YOUR_REPOSITORY_URL
```

Push:

```bash
git push -u origin main
```

---

# Step 17 — Deploy Backend on Render

## 1. Login to Render

Create new web service.

---

## 2. Configure Render

| Setting        | Value          |
| -------------- | -------------- |
| Runtime        | Node           |
| Root Directory | server         |
| Build Command  | npm install    |
| Start Command  | node server.js |

---

## 3. Add Environment Variable

| Key       | Value                                |
| --------- | ------------------------------------ |
| MONGO_URI | Your MongoDB Atlas connection string |

---

## 4. Deploy

After deployment you will receive:

```plaintext
https://your-backend.onrender.com
```

Test backend:

```plaintext
https://your-backend.onrender.com
```

Expected response:

```plaintext
Server Running
```

---

# Step 18 — Deploy Frontend on Vercel

## 1. Import GitHub Repository

Login to Vercel.

Import repository.

---

## 2. Configure Vercel

| Setting          | Value  |
| ---------------- | ------ |
| Framework Preset | Other  |
| Root Directory   | client |

---

## 3. Project Name

Example:

```plaintext
events-urk23cs7130-vasu
```

---

## 4. Deploy

After deployment:

```plaintext
https://your-project.vercel.app
```

---

# Step 19 — Final Production Setup

Update frontend API URL in:

```plaintext
client/script.js
```

Replace localhost API with Render backend URL.

Example:

```javascript
url: "https://your-backend.onrender.com/register"
```

---

# Common Errors and Fixes

## MongoDB Connection Error

Cause:

* Wrong connection string
* IP not whitelisted
* Wrong password

Fix:

* Add `0.0.0.0/0` in Network Access
* Verify password
* Verify cluster name

---

## CORS Error

Cause:

* Frontend domain blocked

Fix:

```javascript
app.use(cors({
  origin: "https://your-vercel-url.vercel.app"
}));
```

---

## Render Deployment Failed

Cause:

* Wrong root directory

Fix:

```plaintext
Root Directory = server
```

---

## Frontend Registration Failed

Cause:

* Wrong backend API URL

Fix:

Update `client/script.js` with deployed backend URL.

---

# Final Result

This project demonstrates:

* Full-stack web development
* REST API development
* MongoDB Atlas integration
* Frontend-backend communication
* Cloud deployment
* Secure environment variable management
* GitHub project management

---

# Author

Developed by Vasu

---

# License

This project is created for educational and academic purposes.
