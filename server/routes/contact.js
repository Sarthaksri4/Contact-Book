const express = require("express");
const { addContact, editContact, getContacts, deleteContact, searchContact } = require("../controllers/contactController.js");
const router = express.Router();
const auth = require('../middleware/auth.js')

router.post("/add", addContact);
router.put("/edit/:id", editContact);
router.get("/", getContacts);
router.delete("/delete/:id", deleteContact);
// router.get("/search", searchContact);

module.exports = router;
