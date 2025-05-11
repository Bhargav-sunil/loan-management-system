import React from 'react';
import {
  FaTachometerAlt, FaUsers, FaMoneyBillWave, FaHandHoldingUsd,
  FaBalanceScale, FaCreditCard, FaChartBar, FaFileAlt, FaCogs,
  FaPiggyBank, FaReceipt, FaPenFancy, FaUserTie, FaCalendarAlt,
  FaCog
} from 'react-icons/fa';
import './Sidebar.css';

const sidebarItems = [
  { label: 'Dashboard', icon: <FaTachometerAlt /> },
  { label: 'Borrowers', icon: <FaUsers /> },
  { label: 'Loans', icon: <FaMoneyBillWave /> },
  { label: 'Repayments', icon: <FaHandHoldingUsd /> },
  { label: 'Loan Parameters', icon: <FaBalanceScale /> },
  { label: 'Accounting', icon: <FaCreditCard /> },
  { label: 'Reports', icon: <FaChartBar /> },
  { label: 'Collateral', icon: <FaFileAlt /> },
  { label: 'Access Configuration', icon: <FaCogs /> },
  { label: 'Savings', icon: <FaPiggyBank /> },
  { label: 'Expenses', icon: <FaReceipt /> },
  { label: 'E-signature', icon: <FaPenFancy /> },
  { label: 'Investor Accounts', icon: <FaUserTie /> },
  { label: 'Calendar', icon: <FaCalendarAlt /> },
  { label: 'Settings', icon: <FaCog /> }
];

const Sidebar = ({ userName = "John Okoh", onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="avatar">👤</div>
        <p className="user-name">{userName}</p>
      </div>
      <ul className="sidebar-list">
        {sidebarItems.map(({ label, icon }) => (
          <li key={label} className="sidebar-item">
            <span className="icon">{icon}</span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
