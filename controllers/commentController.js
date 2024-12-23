const Comment = require("../models/Comment");

// Add a Comment to a Ticket
exports.addComment = async (req, res) => {
  try {
    const { comment, ticketId, user } = req.body;
    const newComment = new Comment({
      ticket: ticketId,
      user: req.user.id,
      comment,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch Comments for a Ticket
exports.getCommentsForTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const comments = await Comment.find({ ticket: ticketId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
