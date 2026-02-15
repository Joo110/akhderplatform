// src/context/AuthProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("auth_token");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    Cookies.set("auth_token", newToken, { expires: 7 }); // يخزن الكوكيز 7 أيام
  };

  const logout = () => {
    setToken(null);
    Cookies.remove("auth_token");
  };

  const value: AuthContextType = {
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook لاستخدام الـ context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
