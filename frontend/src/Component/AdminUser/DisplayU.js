import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayU.css";

function DisplayU() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(""); // State to hold the phone number

  useEffect(() => {
    // Fetch all users from the backend
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/users", {
        withCredentials: true, // If required for authentication
      });
      setUsers(response.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsAppReport = () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    // Generate a message with user details
    const reportMessage = users
      .map((user, index) => `${index + 1}. ${user.username} - ${user.email}`)
      .join("\n");

    // Format the WhatsApp URL with the phone number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      "User Report:\n\n" + reportMessage
    )}`;
    window.open(whatsappURL, "_blank");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="display-all-container">
      <h1>Admin: All Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>NIC</th>
            <th>Age</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.nic || "N/A"}</td>
              <td>{user.age || "N/A"}</td>
              <td>{user.address || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="whatsapp-container">
        <input
          type="text"
          className="phone-input"
          placeholder="Enter WhatsApp number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button className="send-report-button" onClick={sendWhatsAppReport}>
          Send Report to WhatsApp
        </button>
      </div>
    </div>
  );
}

export default DisplayU;
