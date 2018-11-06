const auth = require('../db/utils/auth');

module.exports = {
  register: (req, res) => {
    let { username, password } = req.body;
    auth.register(username, password)
      .then(result => {
        res.status(201).send(result)
      })
      .catch(err => res.status(400).send(err))
  },
  login: (req, res) => {
    const { username, password } = req.body;
    auth.authenticate(username, password)
      .then(result => {
        if (!result.isValid) {
          res
            .status(403)
            .send({
              success: false,
              token: null,
              message: result.message,
            });
          return;
        }
        const userValues = {};
        userValues._id = result.user._id;
        userValues.username = result.user.username;
        const sessionToken = auth.issueToken(userValues);
        let now = new Date();
        let expiry = now.getTime() + auth.tokenExpiration;
        res
          .status(200)
          .send({
            success: true,
            user: userValues,
            token: sessionToken,
            expiry,
            message: result.message
          })
      })
      .catch(err => {
        res
          .status(500)
          .send({
            success: false,
            user: null,
            token: null,
            message: 'Authentication error, please try again'
          })
      })
  },
  logout: (req, res) => {

  }
}