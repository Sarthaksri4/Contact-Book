import React from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, handleDelete }) => {
  return (
    <div className="bg-white p-4 border border-gray-300 rounded shadow-md">
      <h3 className="text-xl font-semibold">{contact.firstname} {contact.middlename} {contact.lastname}</h3>
      <p>Email: {contact.email}</p>
      <p>Phone 1: {contact.phonenumber1}</p>
      <p>Phone 2: {contact.phonenumber2}</p>
      <p>Address: {contact.address}</p>
      <div className="mt-4 flex justify-between">
        <Link to={`/edit/${contact.id}`} className="text-blue-500">Edit</Link>
        <button onClick={() => handleDelete(contact.id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
};

export default ContactCard;
