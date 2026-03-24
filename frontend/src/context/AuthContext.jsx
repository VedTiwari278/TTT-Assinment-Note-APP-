import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("notes_user");
    return stored ? JSON.parse(stored) : null;
  });

  const persistAuth = (userData, token) => {
    setUser(userData);
    localStorage.setItem("notes_user", JSON.stringify(userData));
    if (token) {
      localStorage.setItem("notes_token", token);
    }
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("notes_user");
    localStorage.removeItem("notes_token");
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    persistAuth(data.data, data.token);
    return data;
  };

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    persistAuth(data.data, data.token);
    return data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    clearUser();
  };

  const value = useMemo(() => ({ user, register, login, logout, clearUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

