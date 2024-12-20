import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);  
  const [searchQuery, setSearchQuery] = useState(""); 
  const location = useLocation(); 

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("https://contact-dtdz.onrender.com/api/contacts");
        setContacts(Array.isArray(response.data.contacts) ? response.data.contacts : []);
      } catch (error) {
        console.error("Error fetching contacts", error);
        setContacts([]);
      }
    };

    fetchContacts();

    if (location.state?.reloadContacts) {
      fetchContacts(); 
    }
  }, [location.state]);  

  const handleDelete = async (contactId) => {
    const confirmation = window.confirm("Are you sure you want to delete this contact?");
    if (confirmation) {
      try {
        await axios.delete(`https://contact-dtdz.onrender.com/api/contacts/delete/${contactId}`);
        setContacts(contacts.filter((contact) => contact.contact_id !== contactId));
      } catch (error) {
        console.error("Error deleting contact", error);
      }
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.middlename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phonenumber1.includes(searchQuery) ||
      contact.phonenumber2.includes(searchQuery) ||
      contact.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const itemsPerPage = 8;

  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddContact = async (newContact) => {
    try {
      await axios.post("https://contact-dtdz.onrender.com/api/contacts/add", newContact);

      const response = await axios.get("https://contact-dtdz.onrender.com/api/contacts");
      const updatedContacts = response.data.contacts;
      setContacts(updatedContacts);

      const newTotalPages = Math.ceil(updatedContacts.length / itemsPerPage);

      if (currentPage < newTotalPages) {
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error("Error adding new contact", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#00275a] flex flex-col items-center p-6">
      <div className="text-center mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Contact Book Management System</h1>
        <p className="text-sm font-light">Organize your contacts with ease</p>
      </div>

      <div className="bg-[#31527c] p-8 rounded-lg shadow-lg w-full max-w-screen-xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <Search setSearchQuery={setSearchQuery} />
          <Link
            to="/add"
            className="px-4 py-2 bg-[#00275a] text-white rounded hover:bg-[#31527c] text-center w-full md:w-auto"
          >
            Add Contact
          </Link>
        </div>

        <div className="overflow-x-auto">
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
              {paginatedContacts.map((contact) => (
                <tr key={contact.contact_id} className="border-b hover:bg-[#00275a] hover:text-white">
                  <td className="px-4 py-2 text-white">{contact.firstname}</td>
                  <td className="px-4 py-2 text-white">{contact.middlename}</td>
                  <td className="px-4 py-2 text-white">{contact.lastname}</td>
                  <td className="px-4 py-2 text-white">{contact.email}</td>
                  <td className="px-4 py-2 text-white">{contact.phonenumber1}</td>
                  <td className="px-4 py-2 text-white">{contact.phonenumber2}</td>
                  <td className="px-4 py-2 text-white">{contact.address}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <Link
                        to={`/edit/${contact.contact_id}`}
                        className="bg-[#00275a] text-white px-3 py-1 rounded hover:bg-[#31527c]"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(contact.contact_id)}
                        className="bg-[#00275a] text-white px-3 py-1 rounded hover:bg-[#31527c]"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between text-white space-y-2 md:space-y-0">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-[#00275a] text-white rounded hover:bg-[#31527c] w-full md:w-auto"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-[#00275a] text-white rounded hover:bg-[#31527c] w-full md:w-auto"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
