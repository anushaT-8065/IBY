const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path as needed

// Your MongoDB connection URI
const uri = 'mongodb://localhost:27017/yourdatabase';

// Connect to MongoDB
mongoose.connect(uri)
.then(async () => {
  console.log('MongoDB connected successfully');

  // Fetch all users
  const users = await User.find({});
  console.log('Users in the database:', users);

  // Optionally, find a specific user
  const user = await User.findOne({ username: 'newuser' });
  console.log('Specific user:', user);

  mongoose.connection.close(); // Close the connection when done
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
