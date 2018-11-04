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
        //here
      })
  },
  logout: (req, res) => {

  }
}