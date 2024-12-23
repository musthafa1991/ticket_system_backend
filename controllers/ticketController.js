const Ticket = require("../models/Ticket");
const Comment = require("../models/Comment");

// Fetch All Tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a New Ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority, category, user } = req.body;

    if (!title || !description || !category || !user) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const newTicket = new Ticket({
      title,
      description,
      priority: priority || "Low", // Default priority if not provided
      category,
      user,
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch a User's Tickets
exports.getUserTickets = async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await Ticket.find({ user: userId });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch a Single Ticket
exports.getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Ticket
exports.updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, {
      new: true,
    });
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Ticket
exports.deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findByIdAndDelete(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
