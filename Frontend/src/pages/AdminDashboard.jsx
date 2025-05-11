import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import MonthlyOutstandingBarChart from '../components/MonthlyOutstandingBarChart';
import Sidebar from '../components/Sidebar';
import './AdminDashboard.css';

const COLORS = ['#ffca28', '#66bb6a', '#ef5350'];
const BASE_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const { token,userName } = useAuth();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/loans/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLoans(res.data));
  }, [token]);

  const loanStats = [
    { name: 'Pending', value: loans.filter((l) => l.status === 'pending').length },
    { name: 'Approved', value: loans.filter((l) => l.status === 'approved').length },
    { name: 'Rejected', value: loans.filter((l) => l.status === 'rejected').length },
  ];

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
        <div className="admin-dashboard">
          <h2>Recent Loans</h2>
          <div className="loan-table-wrapper">
            <table className="loan-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Customer</th>
                  <th>Loan Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan._id}>
                    <td>
                      <div className="user-info">
                        <div className="avatar">{loan.userName?.charAt(0).toUpperCase()}</div>
                        <div>
                          <div className="user-name">{loan.userName}</div>
                          <div className="timestamp">Updated recently</div>
                        </div>
                      </div>
                    </td>
                    <td>{loan.userName}</td>
                    <td>₹{loan.loanAmount}</td>
                    <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${loan.status}`}>{loan.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="chart-title">Loan Status Overview</h3>
          <div className="chart-wrapper">
            <PieChart width={400} height={300}>
              <Pie data={loanStats} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                {loanStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div className="chart-wrapper">
            <MonthlyOutstandingBarChart monthlyData={monthlyOutstanding} />
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default AdminDashboard;

