const express = require("express");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Init app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

// Conect db
require("./db");

// User Schema
const User = require("./models/userSchema");

app.get("/", (req, res) => {
  res.status(200).send("Server is working");
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const existingUser = await User.findOne({ email: email });
    if (existingUser) res.status(409).send("Account already exists");
    else {
      const newUser = new User({ email, password });
      await newUser.save();
      res.status(200).send("Signup Successful");
    }
  } catch (e) {
    console.log(e);
    res.status(409).send("Signup Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      if (existingUser.password === password) {
        console.log(existingUser.email + " logged in");
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Wrong password. Login unsuccessful");
      }
    } else {
      res.status(403).send("Account does not exist. SignUp first");
    }
  } catch (e) {
    console.log(e);
    res.status(409).send("Login Error");
  }
});

app.put("/update", async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const update = await User.updateOne(
      { email: email },
      { password: newpassword }
    );
    if (update.modifiedCount) {
      res.status(200).send("Update successful");
    } else {
      res.status(404).send("Account does not exist. SignUp first");
    }
  } catch (e) {
    console.log(e);
    res.status(409).send("Update Error");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const { email } = req.body;
    const del = await User.deleteOne({ email: email });
    console.log(del);
    if (del.deletedCount) {
      res.status(200).send("Deleted successfully");
    } else {
      res.status(404).send("Account does not exist. SignUp first");
    }
  } catch (e) {
    console.log(e);
    res.status(409).send("Delete Error");
  }
});

app.listen(PORT, () => {
  console.log(`[+] server is listening at ${PORT}`);
});
