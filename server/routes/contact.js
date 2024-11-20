const express = require("express");
const { addContact, editContact, getContacts, deleteContact, searchContact } = require("../controllers/contactController.js");
const router = express.Router();
const auth = require('../middleware/auth.js')

router.post("/add", auth, addContact);
router.put("/edit/:id",auth, editContact);
router.get("/", getContacts);
router.delete("/delete/:id", deleteContact);
// router.get("/search", searchContact);

module.exports = router;
