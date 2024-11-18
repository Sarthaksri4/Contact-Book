// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Replace Switch with Routes

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ResetPassword from './components/Auth/ResetPassword';
import ContactList from './components/Contact/ContactList';

const App = () => {
  return (
    <Router>
      <Routes> {/* Replace Switch with Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contacts" element={<ContactList />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
