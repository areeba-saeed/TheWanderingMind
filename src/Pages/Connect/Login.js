import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    const data = { email: email, password: password };
    axios
      .post("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/user/login", data)
      .then((response) => {
        console.log(response.data);
        setEmail("");
        setPassword("");
        setErrorMessage("Logged in");
        setColor("green");
        localStorage.setItem("user", response.data._id);
        localStorage.setItem("username", response.data.name);
        setTimeout(() => {
          setErrorMessage("");
          setColor("");
          window.location.href = "/";
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          setErrorMessage(error.response.data);
          setColor("red");
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "70vh",
        justifyContent: "center",
      }}>
      <h3>Login</h3>
      <p style={{ fontSize: 18, color: color }}>{errorMessage}</p>
      <form style={{ width: "30%" }} onSubmit={handleSubmit}>
        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example1">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter email..."
            id="form2Example1"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            class="form-control"
          />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            id="form2Example2"
            class="form-control"
          />
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
      <div class="text-center">
        <p>
          Not a member? <a href="register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
