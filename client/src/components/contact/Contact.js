import { useContext } from "react";
import ContactContext from "../../context/ContactContext";

import ContactItem from "./ContactItem";

const Contact = () => {
  const { contacts } = useContext(ContactContext);

  return (
    <>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </>
  );
};

export default Contact;
