const express = require("express");
const { addContact, editContact, getContacts, deleteContact, searchContact } = require("../controllers/contactController");
const router = express.Router();
const auth = require('../middleware/auth')

router.post("/add", auth, addContact);
router.put("/edit/:id",auth, editContact);
router.get("/", getContacts);
router.delete("/delete/:id", deleteContact);
// router.get("/search", searchContact);

module.exports = router;
