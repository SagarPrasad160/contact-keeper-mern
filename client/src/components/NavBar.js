import "../App.css";
import PropTypes from "prop-types";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ContactContext from "../context/ContactContext";
import { Link } from "react-router-dom";

const NavBar = ({ icon, title }) => {
  const { isAuthenticated, logoutUser } = useContext(AuthContext);

  const { clearContacts } = useContext(ContactContext);

  const handleLogout = () => {
    logoutUser();
    clearContacts();
  };

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}></i>
        {title}
      </h1>
      <ul>
        {isAuthenticated && <Link to="/">Home</Link>}
        {isAuthenticated && <Link to="/about">About</Link>}
        {isAuthenticated && <Link onClick={handleLogout}>Logout</Link>}
        {!isAuthenticated && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </ul>
    </div>
  );
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

NavBar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default NavBar;
