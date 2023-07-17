import { useContext, useEffect } from "react";

import Contact from "../components/contact/Contact";
import ContactForm from "../components/contact/ContactForm";

import AuthContext from "../context/AuthContext";

const Home = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

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
