require('dotenv').config();

//Depen
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const cors = require('cors');
const app = express();
const path = require('path');

//Cors config
const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200,
};

//App.use
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//App.listening
app.listen(port, () => {
  console.log(`=> Sever is listening on port ${port}`);
});

//DB connection

const connectToDb = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
connectToDb();

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('=> DB error: ' + error);
  mongoose.disconnect(); // Trigger disconnect on any error
});

db.on('connected', () => console.log('=> DB connected'));

db.on('disconnected', () => {
  console.log('=> MongoDB disconnected!');
  connectToDb();
});

//-------------------------Controllers------------------------
//Upload
const upload = require('./controllers/upload');
app.post('/upload', upload);
