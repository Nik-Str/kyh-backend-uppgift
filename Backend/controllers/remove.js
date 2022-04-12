const Upload = require('../models/upload');
const bucket = require('../connection/googleCloud');
const User = require('../models/user');

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);

    if (user) {
      const upload = await Upload.findOneAndDelete({ fileName: req.body.fileName });

      if (upload) {
        const newMemory = user.memory - upload.fileSize;

        await User.findByIdAndUpdate(req.session.userId, { memory: newMemory });

        await bucket.file(`${req.body.fileName}.zip`).delete();
        res.status(200).json({ data: 'File was removed from storage!' });
      } else {
        res.status(404).json({ message: 'File does not exist.' });
      }
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
