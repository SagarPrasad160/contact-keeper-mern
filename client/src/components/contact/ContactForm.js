import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/ContactContext";

const ContactForm = () => {
  const { addContact, edit, editContact } = useContext(ContactContext);

  useEffect(() => {
    if (edit.isEdit) {
      setContact({
        name: edit.current.name,
        email: edit.current.email || "",
        phone: edit.current.phone || "",
        type: edit.current.type || "personal",
      });
    } else {
      setContact({
        name: "",
        phone: "",
        email: "",
        type: "personal",
      });
    }
  }, [edit]);

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if it's an edit
    if (edit.isEdit) {
      // delete the contact first
      editContact(edit.current.id, contact);
    } else {
      // Add New Contact
      addContact(contact);
    }

    // Clear Form Fields
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-primary">
        {edit.isEdit ? "Edit Contact" : "ADD Contact"}
      </h3>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={handleChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={handleChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={edit.isEdit ? "Edit Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
