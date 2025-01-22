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
  const handleSignup = async ({ username, password }) => {
    const res = await signupService.signUp({ username, password });
    navigate("/login", { replace: true });
  };

  return (
    <>
      <h1>Social Media</h1>
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
                <Link to="/signup">Sign-up</Link>
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
                <button onClick={handleLogout}>log-out</button>
              </>
            ) : (
              <Navigate to="/login"></Navigate>
            )
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
