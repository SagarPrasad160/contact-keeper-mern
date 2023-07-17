import { createContext, useState } from "react";
import axios from "axios";

import setAuthToken from "../utils/setAuthToken";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    token: localStorage.getItem("token") || null,
    user: null,
    error: null,
  });

  const registerSuccess = (payload) => {
    localStorage.setItem("token", payload.token);
    setAuth({
      ...auth,
      ...payload,
      isAuthenticated: true,
      loading: false,
    });
  };

  const registerFail = (payload) => {
    localStorage.removeItem("token");
    setAuth({
      ...auth,
      loading: false,
      isAuthenticated: false,
      user: null,
      error: payload,
    });
  };

  const clearErrors = () => {
    setAuth({
      ...auth,
      error: null,
    });
  };

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      setAuth({
        ...auth,
        isAuthenticated: true,
        loading: false,
        user: res.data,
      });
    } catch (error) {
      registerFail(error.response.data.msg);
    }
  };

  const registerUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);
      registerSuccess(res.data);
      loadUser();
    } catch (error) {
      console.log(error);
      registerFail(error.response.data.msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading: auth.loading,
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        error: auth.error,
        registerSuccess,
        registerUser,
        clearErrors,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
