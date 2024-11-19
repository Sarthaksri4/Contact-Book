const createClient = require("../config/db");
let conn;

(async () => {
  try {
    conn = await createClient(); 
  } catch (err) {
    console.error("Error initializing database client:", err);
  }
})();

exports.addContact = async (contactData) => {
    const { firstname, middlename, lastname, email, phonenumber1, phonenumber2, address } = contactData;
    const user_id = req.user_id
    const [result] = await conn.query(
        "INSERT INTO contacts (firstname, middlename, lastname, email, phonenumber1, phonenumber2, address, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [firstname, middlename, lastname, email, phonenumber1, phonenumber2, address, user_id]
    );
    return result.insertId;
};

exports.updateContact = async (id, contactData) => {
    const { firstname, middlename, lastname, email, password, phonenumber1, phonenumber2, address } = contactData;
    await conn.query(
        "UPDATE auth SET firstname = ?, middlename = ?, lastname = ?, email = ?, password = ?, phonenumber1 = ?, phonenumber2 = ?, address = ? WHERE id = ?",
        [firstname, middlename, lastname, email, password, phonenumber1, phonenumber2, address, id]
    );
};

exports.getAllContacts = async (limit, offset) => {
    const [contacts] = await conn.query(
        "SELECT * FROM auth ORDER BY firstname, lastname LIMIT ? OFFSET ?",
        [limit, offset]
    );
    return contacts;
};

exports.DeleteContact = async (id) => {
    await conn.query("delete from auth WHERE id = ?", [id]);
};

exports.searchContacts = async (query) => {
    const [contacts] = await conn.query(
        `SELECT * FROM auth WHERE 
        (firstname LIKE ? OR middlename LIKE ? OR lastname LIKE ? OR email LIKE ? OR phonenumber1 LIKE ? OR phonenumber2 LIKE ? OR address LIKE ?)`,
        [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]
    );
    return contacts;
};
