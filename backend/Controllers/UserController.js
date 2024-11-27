const User = require("../Model/UserModel");

class UserController {
  // Register a new user
  static async registerUser(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    try {
      const newUser = await User.create({ username, email, password });
      res.status(201).json({ status: "ok", user: newUser });
    } catch (err) {
      console.error("Error registering user:", err.message);

      if (err.code === 11000) {
        // Handle duplicate email error
        return res.status(400).json({
          status: "error",
          message: "Email already exists",
        });
      }

      res.status(500).json({ status: "error", message: "Server error" });
    }
  }

  // Login a user and create a session
  static async loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      if (user.password !== password) {
        return res.status(401).json({
          status: "error",
          message: "Incorrect password",
        });
      }

      // Create a session
      req.session.user = { email: user.email, username: user.username };
      res.status(200).json({ status: "ok", message: "Login successful" });
    } catch (err) {
      console.error("Error logging in:", err.message);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }

  // Get logged-in user's details from session
  static async getUserDetails(req, res) {
    if (!req.session.user) {
      return res.status(401).json({
        status: "error",
        message: "Not logged in",
      });
    }

    try {
      const user = await User.findOne({ email: req.session.user.email });
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
      res.status(200).json({ status: "ok", user });
    } catch (err) {
      console.error("Error fetching user details:", err.message);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }

  // Update logged-in user's details
  static async updateUserDetails(req, res) {
    if (!req.session.user) {
      return res.status(401).json({
        status: "error",
        message: "Not logged in",
      });
    }

    const { username, email, nic, age, address } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        status: "error",
        message: "Username and email are required",
      });
    }

    try {
      const user = await User.findOneAndUpdate(
        { email: req.session.user.email }, // Find user by session email
        { username, email, nic, age, address }, // Update details
        { new: true } // Return the updated document
      );

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      // Update session information
      req.session.user = { email: user.email, username: user.username };

      res.status(200).json({
        status: "ok",
        message: "User details updated successfully",
        user,
      });
    } catch (err) {
      console.error("Error updating user details:", err.message);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }

  // Logout a user and destroy the session
  static async logoutUser(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error logging out:", err.message);
        return res
          .status(500)
          .json({ status: "error", message: "Logout failed" });
      }
      res
        .status(200)
        .json({ status: "ok", message: "Logged out successfully" });
    });
  }

  // Delete logged-in user's account
  static async deleteUser(req, res) {
    if (!req.session.user) {
      return res.status(401).json({
        status: "error",
        message: "Not logged in",
      });
    }

    try {
      // Find and delete the user by their email from the session
      const user = await User.findOneAndDelete({
        email: req.session.user.email,
      });

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      // Destroy the session after successful deletion
      req.session.destroy((err) => {
        if (err) {
          console.error(
            "Error destroying session after deletion:",
            err.message
          );
          return res.status(500).json({
            status: "error",
            message: "Account deleted, but session could not be cleared",
          });
        }
        res.status(200).json({
          status: "ok",
          message: "Account deleted successfully",
        });
      });
    } catch (err) {
      console.error("Error deleting user:", err.message);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }

  // Display all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.find({}); // Fetch all users
      res.status(200).json({ status: "ok", users });
    } catch (err) {
      console.error("Error fetching users:", err.message);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }
}

module.exports = UserController;
