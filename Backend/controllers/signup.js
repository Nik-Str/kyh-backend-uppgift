const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (!userExist) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        email: req.body.email,
        password: hash,
        memory: 0,
        subscription: req.body.subscription,
      });
      const user = await newUser.save();

      req.session.userId = user._id;
      req.session.loggedIn = true;

      res.status(201).end();
    } else {
      res.status(406).json({ message: 'Email already registered.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
