const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('express-async-errors')

const loginRouter = express.Router();

// Secret key for JWT (store in environment variables in production)
const JWT_SECRET = "your-secret-key";

// Login route
loginRouter.post("/", async (req, res) => {
    const users = await User.find();
    console.log(users)
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }


    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({ username, token });

});

module.exports = loginRouter;
