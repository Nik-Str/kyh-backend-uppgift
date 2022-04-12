require('dotenv').config();

//Depen
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const port = process.env.PORT || 8080;
const cors = require('cors');
const app = express();

//Cors config
const corsOption = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
  credentials: true,
};

//App.use
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cookieSession({
    name: 'EasyUpload',
    secret: process.env.SESSION_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

//App.listening
app.listen(port, () => {
  console.log(`=> Sever is listening on port ${port}`);
});

//-------------------------DB connection-------------------------
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
  mongoose.disconnect();
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

//Download
const download = require('./controllers/download');
app.get('/download/:id', download);

//Delete
const remove = require('./controllers/remove');
app.post('/remove', remove);

//Logout
const logout = require('./controllers/logout');
app.get('/logout', logout);

//Login
const login = require('./controllers/login');
app.post('/login', login);

const signup = require('./controllers/signup');
app.post('/signup', signup);

const isLoggedIn = require('./controllers/isLoggedIn');
app.get('/isLoggedIn', isLoggedIn);

const status = require('./controllers/status');
app.get('/status', status);
