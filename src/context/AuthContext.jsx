import { createContext, useContext, useEffect, useState } from "react";
import * as api from "../services/mockApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCurrentUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  async function loginUser(credentials) {
    const u = await api.login(credentials);
    setUser(u);
    return u;
  }

  async function registerUser(payload) {
    const u = await api.register(payload);
    setUser(u);
    return u;
  }

  function logoutUser() {
    api.logout();
    setUser(null);
  }

  async function refreshUser(updates) {
    const u = await api.updateProfile(user.id, updates);
    setUser(u);
    return u;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: user?.role === "admin",
        loginUser,
        registerUser,
        logoutUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
