const Upload = require('../models/upload');

module.exports = async (req, res) => {
  try {
    const exist = await Upload.findOne({ fileName: req.params.id });

    if (exist) {
      res.status(200).download(__dirname + '/../output/' + req.params.id + '.zip');
    } else {
      res.status(404).json({ message: 'File does not exist!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
