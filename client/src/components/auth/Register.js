import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../../context/AlertContext";
import AuthContext from "../../context/AuthContext";

import { Navigate } from "react-router-dom";

const Register = () => {
  const { handleAlert } = useContext(AlertContext);

  const { registerUser, error, clearErrors, isAuthenticated } =
    useContext(AuthContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (error === "User already exists") {
      handleAlert(error, "danger");
      clearErrors();
    }
  }, [error, isAuthenticated, handleAlert, clearErrors]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();
    if (!name || !email || !password || !password2) {
      handleAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      handleAlert("Both password must match", "danger");
    } else {
      registerUser({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container" onSubmit={handleSubmit}>
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            name="password2"
            type="password"
            value={password2}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
