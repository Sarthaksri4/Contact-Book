// src/components/Auth/VerifyOTP.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { otp });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Verify OTP
        </button>
      </form>
      {message && <p className="mt-2 text-red-500 text-center">{message}</p>}
    </div>
  );
};

export default VerifyOTP;
