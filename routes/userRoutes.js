const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

// Register a new user
router.post("/register", userController.registerUser);

// Login a user
router.post("/login", userController.loginUser);

// Get user profile
router.get("/profile", authenticate, userController.getUserProfile);

// Update user profile
router.put("/profile", authenticate, userController.updateUserProfile);

// Delete a user (admin only)
router.delete(
  "/:userId",
  authenticate,
  authorizeAdmin,
  userController.deleteUser
);

module.exports = router;
