import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phonenumber1: "",
    phonenumber2: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/contacts/${id}`);
        setContact(response.data);
      } catch (error) {
        console.error("Error fetching contact", error);
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/contacts/${id}`, contact);
      navigate("/");
    } catch (error) {
      console.error("Error updating contact", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#00275a] flex justify-center items-center">
      <div className="bg-[#31527c] p-8 rounded-lg shadow-lg w-96">
        <div className="text-center text-white mb-6">
          <h1 className="text-3xl font-bold mb-2">Edit Contact</h1>
          <p className="text-sm font-light">Update your contact details below</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            value={contact.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="middlename"
            value={contact.middlename}
            onChange={handleChange}
            placeholder="Middle Name"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="lastname"
            value={contact.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phonenumber1"
            value={contact.phonenumber1}
            onChange={handleChange}
            placeholder="Phone Number 1"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phonenumber2"
            value={contact.phonenumber2}
            onChange={handleChange}
            placeholder="Phone Number 2"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <textarea
            name="address"
            value={contact.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded"
          >
            Update Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
