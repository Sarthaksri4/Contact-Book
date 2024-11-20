const createClient = require("../config/db");
let conn;

(async () => {
  try {
    conn = await createClient(); 
  } catch (err) {
    console.error("Error initializing database client:", err);
  }
})();

exports.addContact = async (req, contactData) => {
    const { firstname, middlename, lastname, email, phonenumber1, phonenumber2, address } = contactData;
    const user_id = 2;
    const [result] = await conn.query(
        "INSERT INTO contacts (firstname, middlename, lastname, email, phonenumber1, phonenumber2, address, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [firstname, middlename, lastname, email, phonenumber1, phonenumber2, address, user_id]
    );
    return result.insertId;
};

exports.updateContact = async (id, contactData) => {
    const { firstname, middlename, lastname, email, phonenumber1, phonenumber2, address } = contactData;
    await conn.query(
      "UPDATE contacts SET firstname = ?, middlename = ?, lastname = ?, email = ?, phonenumber1 = ?, phonenumber2 = ?, address = ? WHERE contact_id = ?",
      [firstname, middlename, lastname, email, phonenumber1, phonenumber2, address, id]
    );
  };
  

exports.getAllContacts = async (limit, offset) => {
    const [contacts] = await conn.query(
        "SELECT * FROM contacts ORDER BY firstname, lastname LIMIT ? OFFSET ?",
        [limit, offset]
    );
    return contacts;
};

exports.DeleteContact = async (id) => {
    console.log('sdfga');
    
    await conn.query("delete from contacts WHERE contact_id = ?", [id]);
};


