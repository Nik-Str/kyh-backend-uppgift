//React
import React from 'react';
import { createRoot } from 'react-dom/client';
//React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Global css
import './index.css';
//App
import App from './App';
//Routes
import Home from './routes/Home';
import Download from './routes/Download';
import Upload from './routes/Upload';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Profile from './routes/Profile';
import NotFound from './routes/NotFound';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App nest the underlying element, meaning app is always showing on each page. 
        Child element is switched in the 'Outled' tag in app.js */}
        <Route path="/" element={<App />}>
          {/* Children to app */}
          <Route path="/" element={<Home />} />
          <Route path="upload" element={<Upload />} />
          <Route path="download" element={<Download />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          {/* The "*" has special meaning here. It will match only when no other routes do. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
