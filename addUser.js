const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Database connection
mongoose.connect('mongodb://localhost:27017/messaging_service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

async function addUser() {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('new_password', saltRounds);

    const user = new User({
      username: 'newuser',
      password: hashedPassword
    });

    await user.save();
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  } finally {
    mongoose.connection.close();
  }
}

addUser();
