import { AuthService } from "@/services/AuthService";
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token")); // Track token in state
  const [loadingAuth, setloadingAuth] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }, []);

  const checkSession = useCallback(async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      setloadingAuth(false);
      return;
    }
    try {
      const response = await AuthService.getSession();
      if (response.success) setUser(response.data?.user);
      else logout(); // 401, 403 = dead session
    } catch (error) {
      console.error("Session sync failed!", error);
    } finally {
      setloadingAuth(false);
    }
  }, [logout]);

  useEffect(() => {
    checkSession();

    const heartbeat = setInterval(() => {
      checkSession();
    }, 1 * 60 * 1000); // 1000 = 1 second

    return () => clearInterval(heartbeat);
  }, [checkSession]);

  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
  }

  const value = {
    user,
    token, // Helpful for components making their own fetch calls
    isAuthenticated: !!user,
    login,
    logout,
    loadingAuth,
    refreshSession: checkSession, // Allow manual trigger if needed
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider!");
  }
  return context;
};