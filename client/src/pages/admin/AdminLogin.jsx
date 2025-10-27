import axios from 'axios';
import React, { useState } from 'react';

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/admin/login', form);
    if (res.data.message === "Login Successfully") {
      alert("Login Successfully");
      localStorage.setItem('adminEmail', res.data.admin.email);
      localStorage.setItem('id', res.data.admin.id);
      localStorage.setItem('role', res.data.admin.role);
      window.location.href = '/adminDashboard';
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      color: "#fff"
    }}>
      {/* Logo and Heading outside the card */}
      <img
        src="https://softprofullstackacademy.in/images/Spi%20logo.png"
        alt="Softpro Logo"
        style={{ width: "100px", marginBottom: "10px", objectFit: "contain" }}
      />
      <h1 style={{ fontWeight: "700", marginBottom: "40px" }}>Exam Prep</h1>

      {/* Login card */}
      <div style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(15px)",
        borderRadius: "15px",
        boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
        width: "400px",
        padding: "40px",
        textAlign: "left",
        color: "#fff",
      }}>
        <h2 style={{ marginBottom: "30px", fontWeight: "700", textAlign: "center" }}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ fontWeight: "600", marginBottom: "8px", display: "block" }}>
            Email / Username
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "12px 15px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              fontSize: "1rem",
              background: "rgba(255, 255, 255, 0.85)",
              color: "#333"
            }}
          />
          <label htmlFor="password" style={{ fontWeight: "600", marginBottom: "8px", display: "block" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="***********"
            style={{
              width: "100%",
              padding: "12px 15px",
              marginBottom: "30px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              fontSize: "1rem",
              background: "rgba(255, 255, 255, 0.85)",
              color: "#333"
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 0",
              backgroundColor: "#0c2340",
              color: "#fff",
              fontWeight: "700",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0 8px 15px rgba(12, 35, 64, 0.3)",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={e => e.target.style.backgroundColor = "#152e57"}
            onMouseLeave={e => e.target.style.backgroundColor = "#0c2340"}
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
