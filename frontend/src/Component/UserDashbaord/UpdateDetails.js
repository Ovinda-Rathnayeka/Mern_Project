import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateDetails.css";
import axios from "axios";
import Nav from "../Home/Nav/Nav";

function UpdateDetails() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    nic: "",
    age: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user details
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/details", {
        withCredentials: true, // Ensure session cookies are sent
      });

      const user = response.data.user;

      if (user) {
        setFormData({
          username: user.username || "",
          email: user.email || "",
          nic: user.nic || "",
          age: user.age || "",
          address: user.address || "",
        });
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to load user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending updated details to the server
      const response = await axios.put(
        "http://localhost:5000/user/update", // Backend endpoint
        formData,
        { withCredentials: true } // Ensures session cookies are sent
      );

      if (response.data.status === "ok") {
        // Redirect to mainhome after successful update
        navigate("/userdashbaord");
      } else {
        alert(response.data.message || "Failed to update details.");
      }
    } catch (err) {
      console.error("Error updating details:", err);
      alert("An error occurred while updating details.");
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading state while fetching user details
  }

  if (error) {
    return <p>{error}</p>; // Show an error message if data fails to load
  }

  return (
    <div>
      <Nav />
      <div className="form-container">
        <h2>Update Your Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nic">NIC</label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateDetails;
