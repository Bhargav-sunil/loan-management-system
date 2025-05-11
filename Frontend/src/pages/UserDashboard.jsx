import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './userDashboard.css';

const BASE_URL = import.meta.env.VITE_API_URL;

const UserDashboard = () => {
  const { token } = useAuth();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/loans/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLoans(res.data));
  }, [token]);

  const noLoans = loans.length < 1

  return (
    <div className="user-dashboard">
      <h2>Your Loan Applications</h2>
      <div className="loan-table-wrapper">
        <table className="loan-table">
          <thead>
            <tr>
              <th>Loan Amount</th>
              <th>Tenure (Months)</th>
              <th>Status</th>
              <th>Applied On</th>
            </tr>
          </thead>
          {noLoans && (
            <div className="no-loans-message">
              <p>You have no loan applications.</p>
              <Link to="/apply">Apply for a Loan</Link>
            </div>
          )}
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>₹{loan.loanAmount}</td>
                <td>{loan.loanTenure}</td>
                <td>
                  <span className={`status-badge ${loan.status}`}>{loan.status}</span>
                </td>
                <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
