import Contact from "../components/contact/Contact";
import ContactForm from "../components/contact/ContactForm";

import { Navigate } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const Home = () => {
  const { isAuthenticated,loading } = useContext(AuthContext);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <Contact />
      </div>
    </div>
  );
};

export default Home;
