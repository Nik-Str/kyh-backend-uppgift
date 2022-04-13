const Upload = require('../models/upload');
const { v4: uuidv4 } = require('uuid');
const archiver = require('archiver');
const path = require('path');
const bucket = require('../connection/googleCloud');
const User = require('../models/user');

module.exports = async (req, res) => {
  try {
    if (req.session.loggedIn) {
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

      //Convert to mb
      size = size / (1024 * 1024);

      const user = await User.findById(req.session.userId);

      //Contoll file size
      if (user.memory + size < user.subscription) {
        //Create unique file name and save in db
        const uuid = uuidv4();

        //if not .zip => Convert files to zip and then save to cloudy
        if (type || filesToBuffer.length > 1) {
          const output = bucket.file(`${uuid}.zip`).createWriteStream({
            resumable: false,
            gzip: true,
          });

          const archive = archiver('zip');

          archive.on('error', (err) => {
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

        //Save new file to db
        const upload = new Upload({
          fileName: uuid,
          fileSize: size,
          fileDescription: req.body.description,
          userId: req.session.userId,
        });
        await upload.save();

        //Update User memory
        const newMemory = size + user.memory;
        await User.findByIdAndUpdate(req.session.userId, { memory: newMemory });

        //End response
        res.status(201).json({ data: uuid });
      } else {
        res.status(406).json({ message: `User storage exceed limit of ${user.subscription}mb.` });
      }
    } else {
      res.status(401).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
