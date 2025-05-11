import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const BASE_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert("User Register Successfully")
      setForm({
        userName: '',
        email: '',
        password: '',
        role: 'user',
      })
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="userName" placeholder="Username" value={form.userName} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="verifier">Verifier</option>
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
