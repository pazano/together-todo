const mongoose = require('mongoose');
const db = require('../index.js');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  usernname: {
    type: String,
    unique: true
  },
  password: String,
  salt: String,
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function EncryptUserPasswordOnSave(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt
    .genSalt(10)
    .then((salt) => {
      user.salt = salt;
      return bcrypt.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
      return next();
    })
    .catch(err => next(err));
});

UserSchema.methods.comparePassword = function ValidateSubmittedPassword(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      return resolve(isMatch);
    });
  });
};

const User = db.model('User', UserSchema);

module.exports = User;