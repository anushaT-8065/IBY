const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the User model
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Group',
    default: null
  }
});

module.exports = mongoose.model('Message', messageSchema);
