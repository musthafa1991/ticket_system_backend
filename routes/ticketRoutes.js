const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

// Fetch all tickets (Admin only)
router.get("/", authenticate, authorizeAdmin, ticketController.getAllTickets);
router.post("/", authenticate, ticketController.createTicket);

// Fetch a user's tickets
router.get("/user/:userId", authenticate, ticketController.getUserTickets);

// Fetch a single ticket
router.get("/:ticketId", authenticate, ticketController.getTicketById);

// Update a ticket
router.put(
  "/:ticketId",
  authenticate,
  // authorizeAdmin,
  ticketController.updateTicket
);

// Delete a ticket
router.delete(
  "/:ticketId",
  authenticate,
  // authorizeAdmin,
  ticketController.deleteTicket
);

module.exports = router;
