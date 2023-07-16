import { useContext } from "react";
import ContactContext from "../../context/ContactContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ContactItem from "./ContactItem";

const Contact = () => {
  const { contacts } = useContext(ContactContext);

  return (
    <>
      <TransitionGroup>
        {contacts.map((contact) => (
          <CSSTransition key={contact.id} timeout={500} classNames="item">
            <ContactItem contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default Contact;
