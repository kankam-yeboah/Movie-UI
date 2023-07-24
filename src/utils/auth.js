import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //store the user authState in the local storage of the browser
  const authState = localStorage.getItem("auth-key");
  const [user, setUser] = useState(authState);

  const login = (user) => {
    localStorage.setItem("auth-key", user);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("auth-key");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
