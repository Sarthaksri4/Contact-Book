// src/components/Contact/EditContact.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone1: '',
    phone2: '',
    address: '',
  });

  useEffect(() => {
    // Fetch contact data from API or state
    // Placeholder with dummy data
    setContact({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phone1: '123-456-7890',
      phone2: '098-765-4321',
      address: '123 Main St, Cityville',
    });
  }, [id]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for updating contact
    console.log(contact);
    navigate('/contacts'); // Replace history.push with navigate
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Edit Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={contact.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={contact.lastName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="phone1"
          placeholder="Phone Number 1"
          value={contact.phone1}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="phone2"
          placeholder="Phone Number 2"
          value={contact.phone2}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={contact.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditContact;
