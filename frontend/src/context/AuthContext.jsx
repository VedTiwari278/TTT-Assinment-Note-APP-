import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("notes_user");
    return stored ? JSON.parse(stored) : null;
  });

  const persistUser = (userData) => {
    setUser(userData);
    localStorage.setItem("notes_user", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("notes_user");
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    persistUser(data.data);
    return data;
  };

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    persistUser(data.data);
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

