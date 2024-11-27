const express = require("express");
const UserController = require("../Controllers/UserController");

const router = express.Router();

// Register a new user
router.post("/register", UserController.registerUser);

// Login a user
router.post("/login", UserController.loginUser);

// Get logged-in user's details
router.get("/details", UserController.getUserDetails);

// Logout a user
router.post("/logout", UserController.logoutUser);

// Update user details route
router.put("/update", UserController.updateUserDetails);

// Route to delete a user
router.delete("/delete", UserController.deleteUser);

// Route to display all users
router.get("/users", UserController.getAllUsers);

module.exports = router;
