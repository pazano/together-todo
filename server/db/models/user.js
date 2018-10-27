const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../index.js');

const UserSchema = new Schema({
  login: {
    type: String,
    unique: true
  },
  password: String,
  salt: String,
  lastLogin: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', (next) => {
  // TODO bcrypt the password provided
  next();
})

const User = db.model('User', UserSchema);

module.exports = User;