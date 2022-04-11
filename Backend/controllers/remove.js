const Upload = require('../models/upload');
const bucket = require('../connection/googleCloud');

module.exports = async (req, res) => {
  try {
    const exist = await Upload.findOneAndDelete({ fileName: req.body.fileName });

    if (exist) {
      await bucket.file(`${req.body.fileName}.zip`).delete();
      res.status(200).json({ data: 'File was removed from storage!' });
    } else {
      res.status(404).json({ message: 'File does not exist.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
