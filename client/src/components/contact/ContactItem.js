import { useContext } from "react";
import ContactContext from "../../context/ContactContext";

const ContactItem = ({ contact }) => {
  const { deleteContact, setEdit } = useContext(ContactContext);

  const { name, phone, email, type } = contact;

  const handleDelete = () => {
    setEdit({
      isEdit: false,
      current: null,
    });
    deleteContact(contact._id);
  };

  const handleEdit = () => {
    setEdit({
      isEdit: true,
      current: contact,
    });
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          className={`badge ${
            type === "professional" ? "badge-success" : "badge-primary"
          }`}
        >
          {type[0].toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            {" "}
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            {" "}
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
