import React, { createContext, useState, useEffect } from "react";
import authService from "../authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

    const login = async (username, password) => {
        const result = await authService.login(username, password);
        if (result.success) {
            setIsAuthenticated(true);
        }
        return result; // Return the result to handle errors in LoginPage
    };

    const register = async (username, password, email) => {
        const result = await authService.register(username, password, email);
        if (result.success) {
            setIsAuthenticated(true);
        }
        return result; // Return the result to handle errors in LoginPage
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    useEffect(() => {
        setIsAuthenticated(authService.isAuthenticated());
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
