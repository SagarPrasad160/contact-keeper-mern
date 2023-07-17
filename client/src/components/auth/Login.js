import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AlertContext from "../../context/AlertContext";
import AuthContext from "../../context/AuthContext";
const Login = () => {
  const { handleAlert } = useContext(AlertContext);

  const { loginUser, error, clearErrors, isAuthenticated } =
    useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  useEffect(() => {
    if (error === "Invalid Credentials") {
      handleAlert("Invalid Credentials", "danger");
      clearErrors();
    }
  }, [error, handleAlert, clearErrors]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();
    if (!email || !password) {
      handleAlert("Please fill all fields", "danger");
    } else {
      loginUser({ email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="form-container" onSubmit={handleSubmit}>
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
