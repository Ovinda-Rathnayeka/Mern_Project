import React from "react";
import Nav from "./Nav/Nav";
import "./Home.css";

function Home() {
  return (
    <div id="home-container">
      <Nav />
      <div id="hero-section">
        <h1>Welcome to User Management</h1>
        <p>Manage your users effortlessly with our modern system.</p>
        <button id="hero-button">Get Started</button>
      </div>
    </div>
  );
}

export default Home;
