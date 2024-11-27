import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.css";
import { Link, useNavigate } from "react-router-dom";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from the session
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/details", {
        withCredentials: true, // Ensure session cookies are sent
      });
      setUser(response.data.user);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );
    if (confirmDelete) {
      try {
        await axios.delete("http://localhost:5000/user/delete", {
          withCredentials: true, // Include session cookies
        });

        // Clear session and state
        alert("Your account has been deleted successfully.");
        setUser(null);
        navigate("/"); // Redirect to the homepage after deletion
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Failed to delete your account. Please try again.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading state while fetching data
  }

  if (error) {
    return <p className="error-message">{error}</p>; // Show error message if any
  }

  if (!user) {
    return <p className="no-user-message">User not found or deleted.</p>; // Show when user data is not found
  }

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <div className="user-details">
        <div className="detail-item">
          <span className="detail-label">Username:</span>
          <span className="detail-value">{user.username}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{user.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">NIC:</span>
          <span className="detail-value">{user.nic || "N/A"}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Age:</span>
          <span className="detail-value">{user.age || "N/A"}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Address:</span>
          <span className="detail-value">{user.address || "N/A"}</span>
        </div>
      </div>
      <div className="dashboard-actions">
        {/* Navigation to Update Details page */}
        <Link to="/updatedetails" className="action-button update-button">
          Update Details
        </Link>

        {/* Delete Account button */}
        <button className="action-button delete-button" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
