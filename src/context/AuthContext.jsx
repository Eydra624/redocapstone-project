import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentEmployer");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save user in localStorage when logged in
  useEffect(() => {
    if (currentUser && currentUser.remember) {
      localStorage.setItem("currentEmployer", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentEmployer");
    }
  }, [currentUser]);

  const login = (email, remember) => {
    const newUser = { id: email, email, remember }; // ID based on email for now
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentEmployer");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy use
export const useAuth = () => useContext(AuthContext);
