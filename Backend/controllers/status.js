const User = require('../models/user');
const Upload = require('../models/upload');

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const uploads = await Upload.find({ userId: req.session.userId }, 'fileSize fileName fileDescription');

    if (user) {
      res.status(200).json({ user: user, uploads: uploads });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
