const express = require("express");
const User = require("../models/user")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
const signupRouter = express.Router();
const otpStore = {}; // Temporary storage for OTPs

// Email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gothwalyoge@gmail.com",
        pass: "avcg jpoi qljv cakk",
    },
});

// Send OTP
signupRouter.post("/send-otp", async (req, res) => {
    console.log(req.body)
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = otp; // Store OTP temporarily
    console.log("Generated OTP:", otp);
    const mailOptions = {
        from: "gothwalyoge@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "OTP sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to load OTP" });
    }
});


signupRouter.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;
    console.log(req.body)

    if (otpStore[email] === otp) {
        console.log(otpStore[email] === otp)
        res.json({ success: true, message: "OTP verified!" });
    } else {
        res.status(400).json({ success: false, error: "Invalid OTP" });
    }
});


signupRouter.post("/", async (req, res) => {
    const { email, username, password } = req.body;
    const data = await User.find()
    console.log(data)
    console.log(email, username, password, otpStore[email])
    if (!email || !username || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure OTP was verified
    if (!otpStore[email]) {
        return res.status(400).json({ error: "OTP not verified" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, username, password: hashedPassword });
    console.log("User Before Save:", user);

    await user.save();
    console.log("User After Save:", await User.findOne({ email }));
    delete otpStore[email]; // Remove OTP after successful verification
    res.status(201).json({ message: "Signup successful!" });

});

module.exports = signupRouter;
