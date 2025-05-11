import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');
  const storedName = localStorage.getItem('userName');

  const [token, setToken] = useState(storedToken);
  const [role, setRole] = useState(storedRole);
  const [userName, setUserName] = useState(storedName);

  const login = (token, role, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userName', userName);
    setToken(token);
    setRole(role);
    setUserName(userName);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
