import { useEffect, useState } from "react";
import noteService from "./services/notes";
import loginService from "./services/Login";
import signupService from "./services/Signup";
import "./App.css";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import Logout from "./components/Logout";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user")); // Parse user from localStorage
    console.log("current user: ", user);
    if (user) {
      setUser(user);
      noteService.getAll().then((notes) => {
        console.log("fetched notes: ", notes);
        setNotes(notes);
      });
    }
  }, []);

  //login handling
  const handleLogin = async ({ username, password }) => {
    const res = await loginService.login({ username, password });
    window.localStorage.setItem("user", JSON.stringify(res));

    setUser(res);
    navigate("/notes", { replace: true });
    console.log("login response : ", res);
    console.log("logged-in ", res.username);
  };
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    navigate("/login", { replace: true });
  };
  // Function to complete signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
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
    <>
      <div style={{ textAlign: "center", marginTop: "2vh" }}>
        <h1
          style={{
            fontStyle: "italic",
            display: "inline-block",
            padding: "5px 10px",
            color: "white",
            backgroundColor: "#0d6efd",
            borderRadius: "5px",
          }}
        >
          Social Media
        </h1>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate replace to="/notes"></Navigate>
            ) : (
              <Navigate to="/login">login</Navigate>
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <>
                <Navigate replace to="/notes"></Navigate>
              </>
            ) : (
              <>
                <Login handleSubmit={handleLogin}></Login>
              </>
            )
          }
        ></Route>
        <Route
          path="/signup"
          element={<Signup handleSignup={handleSignup}></Signup>}
        ></Route>
        <Route
          path="/notes"
          element={
            user ? (
              <>
                <Notes notes={notes} setNotes={setNotes}></Notes>
              </>
            ) : (
              <Navigate to="/login"></Navigate>
            )
          }
        ></Route>
      </Routes>
      {user ? <Logout handleLogout={handleLogout}></Logout> : ""}
    </>
  );
}

export default App;
