import { createContext, useState, useEffect } from "react";
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

  const loginUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      registerSuccess(res.data);
      loadUser();
    } catch (error) {
      console.log(error);
      registerFail(error.response.data.msg);
    }
  };

  // set token on initial app loading
  setAuthToken(auth.token);

  if (auth.loading) {
    loadUser();
  }

  useEffect(() => {
    setAuthToken(auth.token);
  }, [auth.token]);

  return (
    <AuthContext.Provider
      value={{
        loading: auth.loading,
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        error: auth.error,
        registerSuccess,
        registerUser,
        loginUser,
        clearErrors,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
