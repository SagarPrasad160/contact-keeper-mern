import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    user: null,
    error: null,
  });

  return (
    <AuthContext.Provider
      value={{
        loading: auth.loading,
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        error: auth.error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
