const createClient = require("../config/db");

// Initialize the client
let conn;

(async () => {
  try {
    conn = await createClient(); 
  } catch (err) {
    console.error("Error initializing database client:", err);
  }
})();


async function findUserByEmail(email) {
  const [rows] = await conn.query("SELECT * FROM auth WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
}

// Create a new user
async function createUser(email, password) {
  await conn.query("INSERT INTO auth (email, password) VALUES (?, ?)", [
    email,
    password,
  ]);
}
module.exports = { findUserByEmail, createUser };
