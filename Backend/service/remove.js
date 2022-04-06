const Upload = require('../models/upload');
const fs = require('fs');
const path = require('path');

module.exports = () => {
  try {
    const remove = async () => {
      //Get all files in db
      const db = await Upload.find({}, 'fileName');

      //Get all files on server
      const dirr = path.join(__dirname, '/../output/');

      fs.readdir(dirr, (err, files) => {
        if (err) throw err;

        //For each file in dirr, compare if exist in db, if not remove from server
        files.forEach((file) => {
          if (!db.some((doc) => doc.fileName + '.zip' === file)) {
            const path = __dirname + '/../output/' + file;
            fs.unlink(path, (err) => {
              if (err) throw err;
            });
          }
        });
      });
      //Retrigger each 5 minut after finish
      setTimeout(remove, 300 * 1000);
    };
    remove();
  } catch (err) {
    console.log(err);
  }
};
