const User = require('../models/user');
const webtoken = require('jsonwebtoken');
const webtokenRefresh = require('jsonwebtoken-refresh');
const crypto = require('crypto');

// TODO - Move to env config
const tokenSecret = 'aa69bd0db71d34f400d981b89aeff7f2';
const tokenExpiration = 7 * 60 * 60;

const register = (username, password) =>
  new Promise((resolve, reject) => {
    User.findOne({ username })
      .exec()
      .then(foundUser => {
        if (foundUser != null) {
          return false; // user exists
        }
        let createUser = new User({ username, password });
        return createUser.save();
      })
      .then(newUser => resolve(newUser))
      .catch(err => reject(err));
  });

const authenticate = (username, password) =>
  new Promise((resolve, reject) => {
    const result = {};
    User.findOne({ username })
      .exec()
      .then(foundUser => {
        if (foundUser === null) {
          result.user = null;
          return false;
        }
        result.user = foundUser;
        return result.user.comparePassword(password);
      })
      .then(isMatch => {
        result.isValid = isMatch;
        result.message = isMatch ? 'Credentials are valid' : 'username provided is incorrect';
        return resolve(result);
      })
      .catch(err => {
        result.isValid = false;
        result.message = 'Error, credentials could not be verified.  Please try again';
        return reject(result);
      });
  });

const issueToken = user =>
  webtoken.sign(
    {
      user,
      xsrfToken: crypto
        .createHash('md5')
        .update(user.username)
        .digest('hex'),
    },
    tokenSecret,
    {
      expiresIn: tokenExpiration,
    },
  );

const verifyToken = token =>
  new Promise((resolve, reject) => {
    webtoken.verify(token, tokenSecret, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });

const refreshToken = token =>
  new Promise((resolve, reject) => {
    const decodedToken = webtoken.decode(token, { complete: true });
    webtokenRefresh.refresh(decodedToken, tokenExpiration, tokenSecret, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });


module.exports = {
  register,
  authenticate,
  issueToken,
  verifyToken,
  refreshToken
}