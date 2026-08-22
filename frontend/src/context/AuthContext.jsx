import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("cardio_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    // Temporary frontend authentication.
    // Later this will call FastAPI.

    if (!email || !password) {
      throw new Error("Please enter email and password.");
    }

    const demoUser = {
      id: 1,
      name: "Dr. Alex Johnson",
      email,
      role: "Researcher",
    };

    localStorage.setItem("cardio_user", JSON.stringify(demoUser));
    setUser(demoUser);

    return demoUser;
  };

  const register = async (name, email, password, role) => {
    if (!name || !email || !password) {
      throw new Error("Please fill all required fields.");
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
    };

    localStorage.setItem("cardio_user", JSON.stringify(newUser));
    setUser(newUser);

    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("cardio_user");
    setUser(null);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("cardio_user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}