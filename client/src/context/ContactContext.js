import { createContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const ContactContext = createContext();

const contactsArr = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    type: "personal",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "987-654-3210",
    type: "professional",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    phone: "555-123-4567",
    type: "personal",
  },
  {
    id: 4,
    name: "Bob Anderson",
    email: "bobanderson@example.com",
    phone: "888-999-0000",
    type: "professional",
  },
];

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState(contactsArr);

  const addContact = (contact) => {
    contact.id = uuidv4();
    setContacts([...contacts, contact]);
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact }}>
      {children}
    </ContactContext.Provider>
  );
}

export default ContactContext;
