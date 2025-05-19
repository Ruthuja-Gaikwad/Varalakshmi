const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { authenticateAdmin } = require('../middleware/auth');

// POST /api/contact - Public route to submit a contact message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error saving contact message:', error.message);
    res.status(500).json({ success: false, error: 'Failed to send message. Please try again later.' });
  }
});

// GET /api/contact - Protected route to fetch all contact messages (admin/user)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch messages.' });
  }
});

// DELETE /api/contact/:id - Protected route to delete a specific contact message (admin/user)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const deletedMessage = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ success: false, error: 'Message not found.' });
    }
    res.status(200).json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting message:', error.message);
    res.status(500).json({ success: false, error: 'Failed to delete message.' });
  }
});

module.exports = router;
