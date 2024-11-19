import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "./Search";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contacts");
        setContacts(Array.isArray(response.data) ? response.data : []); 
      } catch (error) {
        console.error("Error fetching contacts", error);
        setContacts([]); 
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    const confirmation = window.confirm("Are you sure you want to delete this contact?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3000/api/contacts/${contactId}`);
        setContacts(contacts.filter(contact => contact.id !== contactId)); 
      } catch (error) {
        console.error("Error deleting contact", error);
      }
    }
  };

  const itemsPerPage = 10;
  const paginatedContacts = contacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const filteredContacts = paginatedContacts.filter(contact =>
    contact.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.middlename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phonenumber1.includes(searchQuery) ||
    contact.phonenumber2.includes(searchQuery) ||
    contact.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#00275a] flex flex-col items-center p-6">
      <div className="text-center mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Contact Book Management System</h1>
        <p className="text-sm font-light">Organize your contacts with ease</p>
      </div>

      <div className="bg-[#31527c] p-8 rounded-lg shadow-lg w-full max-w-screen-xl">
        <div className="flex justify-start items-center mb-4">
          <Search setSearchQuery={setSearchQuery} />
        </div>

        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#00275a] text-white">
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Middle Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number 1</th>
              <th className="px-4 py-2">Phone Number 2</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => (
              <tr key={contact.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{contact.firstname}</td>
                <td className="px-4 py-2">{contact.middlename}</td>
                <td className="px-4 py-2">{contact.lastname}</td>
                <td className="px-4 py-2">{contact.email}</td>
                <td className="px-4 py-2">{contact.phonenumber1}</td>
                <td className="px-4 py-2">{contact.phonenumber2}</td>
                <td className="px-4 py-2">{contact.address}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between text-white">
          <button
            onClick={() => setCurrentPage(prev => prev > 1 ? prev - 1 : 1)}
            className="px-4 py-2 bg-[#00275a] text-white rounded hover:bg-[#31527c]"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage(prev => prev < Math.ceil(contacts.length / itemsPerPage) ? prev + 1 : prev)}
            className="px-4 py-2 bg-[#00275a] text-white rounded hover:bg-[#31527c]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
