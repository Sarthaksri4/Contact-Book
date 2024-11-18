// src/components/Contact/ContactList.js
import React from 'react';
import { Link } from 'react-router-dom';

const ContactList = () => {
  const contacts = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phone1: '123-456-7890',
      phone2: '098-765-4321',
      address: '123 Main St, Cityville',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@example.com',
      phone1: '111-222-3333',
      phone2: '444-555-6666',
      address: '456 Elm St, Townsville',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contacts</h1>
      <Link to="/add-contact" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4 inline-block">
        Add New Contact
      </Link>
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Full Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="px-4 py-2">{contact.firstName} {contact.lastName}</td>
              <td className="px-4 py-2">{contact.email}</td>
              <td className="px-4 py-2">{contact.phone1}, {contact.phone2}</td>
              <td className="px-4 py-2">
                <Link to={`/edit-contact/${contact.id}`} className="text-blue-500 hover:text-blue-700 mr-4">
                  Edit
                </Link>
                <button className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
