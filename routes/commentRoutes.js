const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { authenticate } = require("../middlewares/authMiddleware");

// Add a comment to a ticket
router.post("/", authenticate, commentController.addComment);

// Fetch comments for a ticket
router.get("/:ticketId", authenticate, commentController.getCommentsForTicket);

module.exports = router;
