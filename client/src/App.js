import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './utils/PrivateRoute';
import './index.css';

function App() {
  return (
  
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        
        <Route path="/" element={<ProtectedRoute><ContactList /></ProtectedRoute>} />
        <Route path="/contacts" element={<ProtectedRoute><ContactList /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddContact /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditContact /></ProtectedRoute>} />
      </Routes>
  
  );
}

export default App;
