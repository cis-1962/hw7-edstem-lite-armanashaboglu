import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import SignUp from './components/SignUp'; // Adjust path as necessary
import Login from './components/Login'; // Adjust path as necessary
import HomePage from './components/HomePage'; // Adjust path as necessary


import './app.css';

function App() {

  return (
    <>
      <Router>
      

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;


/*
<nav>
        <ul>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
*/