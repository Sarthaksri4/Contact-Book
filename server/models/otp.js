const createClient = require("../config/db");

// Initialize the client
let conn;

(async () => {
  try {
    conn = await createClient(); // Create and reuse the client connection
  } catch (err) {
    console.error("Error initializing database client:", err);
  }
})();
// Find the latest OTP for a given email
async function findLatestOtpByEmail(email) {
  // const [rows] = await conn.query("SELECT * FROM otps WHERE email = ? ORDER BY createdAt DESC LIMIT 1", [email]);
    const [rows] = await conn.query("SELECT * FROM otps WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
}

// Create a new OTP
async function createOtp(email, otp) {
  await conn.query("INSERT INTO otps (email, otp) VALUES (?, ?)", [email, otp]);
}

module.exports = { findLatestOtpByEmail, createOtp };
