const Upload = require('../models/upload');
const { v4: uuidv4 } = require('uuid');
const archiver = require('archiver');
const path = require('path');
const bucket = require('../connection/googleCloud');

module.exports = async (req, res) => {
  try {
    let size = 0;
    let type = true;
    const filesToBuffer = [];

    for (const key in req.files) {
      size = size + req.files[key].size;

      if (path.extname(req.files[key].name) === '.zip') {
        type = false;
      }

      filesToBuffer.push(req.files[key]);
    }

    //Contoll file size
    if (size / (1024 * 1024) < 5) {
      //Create unique file name and save in db
      const uuid = uuidv4();

      const upload = new Upload({
        fileName: uuid,
      });

      await upload.save();

      //if not .zip => Convert files to zip and then save to cloudy
      if (type || filesToBuffer.length > 1) {
        const output = bucket.file(`${uuid}.zip`).createWriteStream({
          resumable: false,
          gzip: true,
        });

        const archive = archiver('zip');

        archive.on('error', async (err) => {
          await Upload.findOneAndDelete({ fileName: uuid });
          throw err;
        });

        archive.pipe(output);
        filesToBuffer.forEach((file) => {
          const buffer = Buffer.from(file.data);
          archive.append(buffer, { name: `${file.name}` });
        });

        await archive.finalize();
      } else {
        await bucket.file(`${uuid}.zip`).save(req.files.file0.data);
      }
      //End response
      res.status(201).json({ data: uuid });
    } else {
      res.status(406).json({ message: 'File size exceed 5mb.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
