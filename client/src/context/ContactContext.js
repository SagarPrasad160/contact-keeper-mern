import { createContext, useState } from "react";
import axios from "axios";

const ContactContext = createContext();

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState({
    contactData: [],
    error: null,
  });

  const [edit, setEdit] = useState({ isEdit: false, current: null });

  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      setContacts({
        ...contacts,
        contactData: [...contacts.contactData, res.data],
      });
    } catch (error) {
      setContacts({
        ...contacts,
        error,
      });
    }
  };

  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      setContacts({
        ...contacts,
        contactData: res.data,
      });
    } catch (error) {
      setContacts({
        ...contacts,
        error,
      });
    }
  };

  const clearContacts = () => {
    setContacts({
      ...contacts,
      contactData: [],
    });
  };

  const editContact = async (id, newContact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`api/contacts/${id}`, newContact, config);
      const updatedContacts = contacts.contactData.map((contact) => {
        if (contact._id === id) {
          return {
            ...res.data,
          };
        }
        return contact;
      });
      setContacts({
        ...contacts,
        contactData: updatedContacts,
      });
    } catch (error) {
      setContacts({
        ...contacts,
        error,
      });
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      setContacts({
        ...contacts,
        contactData: contacts.contactData.filter(
          (contact) => contact._id !== id
        ),
      });
    } catch (error) {
      setContacts({
        ...contacts,
        error,
      });
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        getContacts,
        clearContacts,
        deleteContact,
        edit,
        editContact,
        setEdit,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export default ContactContext;
