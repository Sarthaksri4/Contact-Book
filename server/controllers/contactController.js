const ContactModel = require("../models/contact");

exports.addContact = async (req, res) => {
    try {
        const contactData = req.body;
        const id = await ContactModel.addContact(req, contactData);
        res.status(201).json({ success: true, message: "Contact added successfully", id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add contact" });
    }
};

exports.editContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contactData = req.body;
        await ContactModel.updateContact(id, contactData);
        res.status(200).json({ success: true, message: "Contact updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update contact" });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const contacts = await ContactModel.getAllContacts(parseInt(limit), parseInt(offset));
        res.status(200).json({ success: true, contacts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch contacts" });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        
        await ContactModel.DeleteContact(id);
        res.status(200).json({ success: true, message: "Contact deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete contact" });
    }
};

// exports.searchContact = async (req, res) => {
//     try {
//         const { query } = req.query;
//         const contacts = await ContactModel.searchContacts(query);
//         res.status(200).json({ success: true, contacts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Failed to search contacts" });
//     }
// };
