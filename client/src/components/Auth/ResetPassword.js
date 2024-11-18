// src/components/Auth/ResetPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate

const ResetPassword = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for resetting the password (e.g., API call)
    console.log('Resetting password for:', email);
    // Redirect to login or a confirmation page
    navigate('/login'); // Replace history.push with navigate
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
