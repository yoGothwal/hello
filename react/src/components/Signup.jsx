import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import signupService from "../services/Signup";

const Signup = ({ handleSignup }) => {
  const [step, setStep] = useState(1); // Track form step
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Navigation hook

  // Function to send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const data = await signupService.sendOtp(email); // Use service to send OTP
      console.log(data);
      if (data.success) {
        alert("OTP sent successfully!");
        setStep(2); // Move to OTP step
      } else {
        alert("Error sending OTP");
      }
    } catch (error) {
      alert("Failed to send OTP");
    }
  };

  // Function to verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const data = await signupService.verifyOtp(email, otp); // Use service to verify OTP
      if (data.success) {
        console.log(data);
        alert("OTP Verified!");
        setStep(3); // Move to username and password step
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      alert("OTP verification failed");
    }
  };

  // Function to complete signup
  const handleSignupSubmit = async (e) => {
    console.log(email, username, password);
    e.preventDefault();
    try {
      const data = await signupService.signUp({ email, username, password });
      console.log(data);
      if (data.message) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Signup error");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form
        onSubmit={handleSignupSubmit}
        className="p-4 border rounded shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3">Sign Up</h3>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button onClick={sendOtp} className="btn btn-primary w-100">
              Send OTP
            </button>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <>
            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button onClick={verifyOtp} className="btn btn-primary w-100">
              Verify OTP
            </button>
          </>
        )}

        {/* Step 3: Set Username & Password */}
        {step === 3 && (
          <>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Choose username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-success w-100">Sign Up</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Signup;
