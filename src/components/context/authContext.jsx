// src/context/authContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { signUp, login, logout } from '../services/authService'; // Correct import

// Creating the AuthContext
const AuthContext = createContext();

// Creating the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
        logout(); 
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
