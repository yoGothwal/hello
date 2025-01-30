import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection

const Signup = ({ handleSignup }) => {
  const [step, setStep] = useState(1); // Track form step
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Navigation hook

  // Function to send OTP
  const sendOtp = (e) => {
    e.preventDefault();
    console.log("Sending OTP to:", email);

    // Simulate backend OTP request
    setTimeout(() => {
      alert(`OTP sent to ${email}`);
      setStep(2); // Move to OTP step
    }, 1000);
  };

  // Function to verify OTP
  const verifyOtp = (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);

    // Simulate backend OTP verification
    if (otp === "123456") {
      // Replace with actual backend verification
      alert("OTP Verified! Now set your username and password.");
      setStep(3); // Move to username/password step
    } else {
      alert("Invalid OTP. Try again!");
    }
  };

  // Function to complete signup
  const completeSignup = (e) => {
    e.preventDefault();
    console.log("Creating account for:", username);

    // Simulate backend signup
    setTimeout(() => {
      alert("Signup successful! Redirecting to Login...");
      handleSignup({ email, username, password }); // Save user info
      navigate("/login"); // Redirect to Login
    }, 1000);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form
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
            <button onClick={completeSignup} className="btn btn-success w-100">
              Sign Up
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Signup;
