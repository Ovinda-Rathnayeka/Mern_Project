import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; // Import CSS for styling
import Nav from "../Home/Nav/Nav"; // Navigation component

function Signup() {
  const history = useNavigate(); // Hook for navigation
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!user.username || !user.email || !user.password) {
      alert("All fields are required!");
      return;
    }

    sendRequest()
      .then(() => {
        alert("Register Success");
        setUser({ username: "", email: "", password: "" }); // Clear form fields
        history("/login");
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || "An error occurred. Please try again.";
        alert(errorMessage);
      });
  };

  const sendRequest = async () => {
    return await axios.post("http://localhost:5000/user/register", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  };

  return (
    <div id="signup-container">
      <Nav />
      <div id="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" id="signup-button">
            Sign Up
          </button>
        </form>
        <p id="login-link">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
