import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const ApplyForm = () => {
  const { token, userName } = useAuth();
  const [form, setForm] = useState({
    userName: userName || '',
    loanAmount: '',
    loanTenure: '',
    reason: '',
    employmentStatus: '',
    employmentAddress: '',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/loans/apply', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Loan application submitted');
  };

  return (
    <div className="form-container">
      <h2>Apply for a Loan</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <input key={key} name={key} value={value} placeholder={key} onChange={handleChange} required />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplyForm;
