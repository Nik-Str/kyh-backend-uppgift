const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

uploadSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('upload', uploadSchema);
