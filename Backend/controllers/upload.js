const Upload = require('../models/upload');
const { v4: uuidv4 } = require('uuid');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    //Contoll file size
    if (req.files.file.size / (1024 * 1024) < 5) {
      //Create unique file name and save in db
      const uuid = uuidv4();

      const upload = new Upload({
        fileName: uuid,
      });

      await upload.save();

      //if not .zip => Convert files to zip and then save temporary to server directory
      const output = fs.createWriteStream(__dirname + '/../output/' + uuid + '.zip');
      const archive = archiver('zip');

      if (path.extname(req.files.file.name) !== '.zip') {
        archive.on('error', async (err) => {
          await Upload.findOneAndDelete({ fileName: uuid });
          throw err;
        });

        archive.pipe(output);

        const buffer = Buffer.from(req.files.file.data);
        archive.append(buffer, { name: `${req.files.file.name}` });

        await archive.finalize();
      } else {
        req.files.file.mv(path.resolve(__dirname + '/../output/' + uuid + '.zip'));
      }
      //End response
      res.status(201).json({ data: uuid });
    } else {
      res.status(406).json({ message: 'File size exceed 5mb!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
