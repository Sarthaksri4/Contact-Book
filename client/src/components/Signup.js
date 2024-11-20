import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    try {
      await axios.post("https://contact-dtdz.onrender.com/api/auth/sendotp", {
        email: formData.email,
      });
      setOtpSent(true);
      alert("OTP sent to your email.");
    } catch (error) {
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post("https://contact-dtdz.onrender.com/api/auth/signup", {
        ...formData,
        otp,
      });
      alert("Signup successful. Please log in.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed. Ensure OTP is correct.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#00275a" }}>
      <div className="absolute top-16 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Contact Book Management System</h1>
        <p className="text-sm font-light">Organize your contacts with ease</p>
      </div>
      <div className="p-6 rounded shadow-md w-96" style={{ backgroundColor: "#31527c" }}>
        <h2 className="text-xl font-bold mb-4 text-center text-white">Signup</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 border rounded"
        />
        {otpSent ? (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <button
              onClick={handleSignup}
              className="w-full p-2 rounded text-white"
              style={{ backgroundColor: "#00275a" }}
            >
              Verify OTP & Signup
            </button>
          </>
        ) : (
          <button
            onClick={handleSendOtp}
            className="w-full p-2 rounded text-white"
            style={{ backgroundColor: "#00275a" }}
          >
            Send OTP
          </button>
        )}

        <div className="mt-4 text-center text-white">
          <span>Already have an account? </span>
          <button onClick={() => navigate("/login")} className="text-blue-300">
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
