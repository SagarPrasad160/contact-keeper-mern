import { useContext, useEffect } from "react";
import ContactContext from "../../context/ContactContext";
import { motion, AnimatePresence } from "framer-motion";

import ContactItem from "./ContactItem";

const Contact = () => {
  const { contacts, getContacts } = useContext(ContactContext);

  const { contactData } = contacts;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AnimatePresence>
        {contactData.map((contact) => (
          <motion.div
            key={contact._id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ContactItem contact={contact} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default Contact;
