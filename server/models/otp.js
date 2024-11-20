const createClient = require("../config/db");

let conn;

(async () => {
  try {
    conn = await createClient(); 
  } catch (err) {
    console.error("Error initializing database client:", err);
  }
})();
async function findLatestOtpByEmail(email) {
  // const [rows] = await conn.query("SELECT * FROM otps WHERE email = ? ORDER BY createdAt DESC LIMIT 1", [email]);
    const [rows] = await conn.query("SELECT * FROM otps WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
}

async function createOtp(email, otp) {
  await conn.query("INSERT INTO otps (email, otp) VALUES (?, ?)", [email, otp]);
}

module.exports = { findLatestOtpByEmail, createOtp };
