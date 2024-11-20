import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/contacts");
    } catch (error) {
      // alert("Login failed. Check your credentials.");
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#00275a" }}>
      <div className="absolute top-16 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Contact Book Management System</h1>
        <p className="text-sm font-light">Organize your contacts with ease</p>
      </div>
      <div className="p-6 rounded shadow-md w-96" style={{ backgroundColor: "#31527c" }}>
        <h2 className="text-xl font-bold mb-4 text-center text-white">Login</h2>

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
        <button
          onClick={handleLogin}
          className="w-full p-2 rounded text-white"
          style={{ backgroundColor: "#00275a" }}
        >
          Login
        </button>

        <div className="mt-4 text-center text-white">
          <span>Don't have an account? </span>
          <button onClick={() => navigate("/")} className="text-blue-300">
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
