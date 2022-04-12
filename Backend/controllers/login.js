const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const password = await bcrypt.compare(req.body.password, user.password);
      if (password) {
        req.session.userId = user._id;
        req.session.loggedIn = true;
        res.status(201).end();
      } else {
        fail(res);
      }
    } else {
      fail(res);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

const fail = (res) => {
  return res.status(401).json({ message: 'Invalid Email or Password.' });
};
