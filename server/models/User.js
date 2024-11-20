const createClient = require("../config/db");

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

async function createUser(email, password) {
  await conn.query("INSERT INTO auth (email, password) VALUES (?, ?)", [
    email,
    password,
  ]);
}
module.exports = { findUserByEmail, createUser };
