const User = require('../models/user');

const registerUser = (login, password) =>
  new Promise((resolve, reject) => {
    User.findOne({ login })
      .exec()
      .then(foundUser => {
        if (foundUser != null) {
          return foundUser, false;
        }
        let createUser = new User({ login, password });
        return createUser.save();
      })
      .then(newUser => resolve(newUser))
      .catch(err => reject(err));
  });

module.exports = {
  register: registerUser,
}