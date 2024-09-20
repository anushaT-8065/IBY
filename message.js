const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User'); 

// Route to send a message
router.post('/send', async (req, res) => {
  const { senderId, recipientId, content, groupId } = req.body;

  try {
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(400).send('Invalid sender or recipient');
    }

    const message = new Message({
      sender: senderId,
      recipient: recipientId,
      content,
      groupId: groupId || null
    });

    await message.save();
    res.status(201).send('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
});

// Route to retrieve messages between two users
router.get('/conversation/:senderId/:recipientId', async (req, res) => {
  const { senderId, recipientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId }
      ]
    }).sort({ timestamp: 1 }); 

    res.json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).send('Error retrieving messages');
  }
});

// Route to retrieve all messages for a group
router.get('/group/:groupId', async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await Message.find({ groupId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error retrieving group messages:', error);
    res.status(500).send('Error retrieving group messages');
  }
});

module.exports = router;
