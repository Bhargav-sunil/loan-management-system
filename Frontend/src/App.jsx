import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ApplyForm from './pages/ApplyForm';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import VerifierDashboard from './pages/VerifierDashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply" element={<ProtectedRoute role="user"><ApplyForm /></ProtectedRoute>} />
        <Route path="/user-dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/verifier-dashboard" element={<ProtectedRoute role="verifier"><VerifierDashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
