import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MonthlyOutstandingBarChart from '../components/MonthlyOutstandingBarChart';
import Sidebar from '../components/Sidebar';
import './VerifierDashboard.css';

const VerifierDashboard = () => {
  const { token,userName } = useAuth();
  const [loans, setLoans] = useState([]);

  const fetchPending = () => {
    axios
      .get('http://localhost:4000/api/loans/pending', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLoans(res.data));
  };

  useEffect(fetchPending, []);

  const updateStatus = async (id, status) => {
    await axios.patch(
      `http://localhost:4000/api/loans/update/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchPending();
  };

  const monthlyOutstanding = Array(12).fill(0);
  loans.forEach((loan) => {
    const month = new Date(loan.createdAt).getMonth();
    if (loan.status !== 'rejected') {
      monthlyOutstanding[month] += 1;
    }
  });

  return (
    <div className="dashboard-layout">
      <Sidebar userName={userName}/>
      <div className="main-content">
        <div className="verifier-dashboard">
          <h2>Pending Loan Applications</h2>
          <div className="loan-table-wrapper">
            <table className="loan-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Amount</th>
                  <th>Tenure</th>
                  <th>Applied On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan._id}>
                    <td>{loan.userName}</td>
                    <td>₹{loan.loanAmount}</td>
                    <td>{loan.loanTenure} months</td>
                    <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="approve"
                          onClick={() => updateStatus(loan._id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="reject"
                          onClick={() => updateStatus(loan._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
        </table>
      </div>
      <div className="chart-wrapper">
        <MonthlyOutstandingBarChart monthlyData={monthlyOutstanding} />
      </div>
    </div>
      </div>
    </div>

    
  );
};

export default VerifierDashboard;
