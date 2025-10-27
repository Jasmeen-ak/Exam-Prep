import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/examinee/login', form);
      if (res.data.message === "Login Successfully") {
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userRole", res.data.user.role);
        window.location.href = '/userDashboard';
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        height: '100vh',
        width: '100%',
        padding: '30px',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      {/* Logo and Title */}
      <div className="text-center mb-4">
        <img
          src="https://softprofullstackacademy.in/images/Spi%20logo.png"
          alt="SPI Logo"
          style={{
            width: "90px",
            marginBottom: "10px",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
          }}
        />
        <h1 className="text-white fw-bold" style={{ fontSize: "38px" }}>Exam Prep</h1>
      </div>

      {/* Login Card */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "40px 35px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          color: "#fff",
        }}
      >
        <h3 className="text-center mb-4 fw-semibold">Login</h3>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email / Username</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              onChange={handleChange}
              required
              style={{
                borderRadius: "10px",
                padding: "10px",
                border: "none",
                backgroundColor: "#ffffffcc",
                fontWeight: 500,
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="form-control"
              onChange={handleChange}
              required
              style={{
                borderRadius: "10px",
                padding: "10px",
                border: "none",
                backgroundColor: "#ffffffcc",
                fontWeight: 500,
              }}
            />
          </div>

          {/* Forgot password */}
          <div className="text-end mb-3">
            <a href="#" className="text-white text-decoration-underline">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              backgroundColor: "#061c3d",
              color: "#fff",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "16px",
              transition: "0.3s ease",
              border: "none",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0c2340")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#061c3d")}
          >
            LOGIN
          </button>
        </form>

        {/* Register */}
        <div className="d-flex justify-content-center mt-4">
          <p className="me-1 mb-0">Don't have an account?</p>
          <Link to="/register" className="text-white fw-bold text-decoration-underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
