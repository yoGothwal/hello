import React, { useState } from "react";

const Login = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const onSubmit = (event) => {
    console.log(username, password);
    event.preventDefault();
    handleSubmit({ username, password });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <>
          <input
            type="text"
            placeholder="username@123"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </>
        <>
          <input
            type="password"
            placeholder="******"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
