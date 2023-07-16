import "../App.css";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const NavBar = ({ icon, title }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}></i>
        {title}
      </h1>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
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
