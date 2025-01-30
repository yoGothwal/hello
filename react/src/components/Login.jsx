import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    console.log(username, password);
    event.preventDefault();
    handleSubmit({ username, password });
  };

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "10vh" }}
      >
        <div
          className="card p-4 shadow"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="text-center mb-3">Login</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="username@123"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="******"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <div className="text-center mt-3">
              <p>
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgotten account?
                </Link>
                {" · "}
                <Link to="/signup" className="text-decoration-none">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
