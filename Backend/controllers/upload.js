const Upload = require('../models/upload');
const { v4: uuidv4 } = require('uuid');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
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

    //Send files to cloud storage
    console.log(archive.pointer());

    //End response
    res.status(200).json({ data: uuid });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
