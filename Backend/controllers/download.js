const Upload = require('../models/upload');
const bucket = require('../connection/googleCloud');

module.exports = async (req, res) => {
  try {
    const exist = await Upload.findOne({ fileName: req.params.id });

    if (exist) {
      await bucket.file(`${req.params.id}.zip`).createReadStream().pipe(res);
    } else {
      res.status(404).json({ message: 'File does not exist!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
