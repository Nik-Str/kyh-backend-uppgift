const path = require('path');
const { Storage } = require('@google-cloud/storage');

const gc = new Storage({
  keyFilename: path.join(__dirname, '../optical-metric-346306-5d8aac084180.json'),
  projectId: 'optical-metric-346306',
});

module.exports = gc.bucket('developbucket');
