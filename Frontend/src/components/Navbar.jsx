import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { token, role, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">CreditSea</div>
      <ul className="navbar-links">
        {!token && (
          <>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {token && role === 'user' && (
          <>
            <li><Link to="/apply">Apply Loan</Link></li>
            <li><Link to="/user-dashboard">Dashboard</Link></li>
          </>
        )}
        {token && role === 'admin' && (
          <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        )}
        {token && role === 'verifier' && (
          <li><Link to="/verifier-dashboard">Verifier Dashboard</Link></li>
        )}
        {token && (
          <li><button className="logout-btn" onClick={logout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
