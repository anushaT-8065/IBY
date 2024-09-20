const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); 

mongoose.connect('mongodb://localhost:27017/messaging_service', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

async function hashAndUpdatePassword(username, plainPassword) {
  try {
    // Hash the plain text password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    // Update the user with the hashed password
    await User.updateOne({ username }, { $set: { password: hashedPassword } });
    console.log(`Password for ${username} updated successfully!`);
  } catch (error) {
    console.error(`Error updating password for ${username}:`, error);
  }
}

async function updatePasswords() {
  await hashAndUpdatePassword('newuser1', 'new_password1'); // Plain text password used earlier
  await hashAndUpdatePassword('newuser2', 'new_password2'); // Plain text password used earlier
  mongoose.connection.close(); // Close the connection after updating
}

updatePasswords();
