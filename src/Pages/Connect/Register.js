import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);
    axios
      .post("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/user/register", formData)
      .then((response) => {
        console.log(response.data);
        setEmail("");
        setPassword("");
        setName("");
        setErrorMessage("Account registered");
        setColor("green");
        localStorage.setItem("user", response.data._id);
        localStorage.setItem("username", response.name);
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
      <h3>Register</h3>
      <p style={{ fontSize: 18, color: color }}>{errorMessage}</p>
      <form style={{ width: "30%" }} onSubmit={handleSubmit}>
        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example1">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name..."
            id="form2Example1"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            class="form-control"
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Profile picture:
          </label>
          <input
            type="file"
            className="form-control"
            id="fileInput"
            onChange={(e) => setImage(e.target.files[0])}
            accept=".jpg, .jpeg, .png"
          />
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          Sign up
        </button>
      </form>
      <div class="text-center">
        <p>
          Already have an account? <a href="register">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
