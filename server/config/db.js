require('dotenv').config();
const mysql = require('mysql2/promise');

async function createClient() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 19354,
    });

    console.log('Connected to MySQL database!');
    return conn;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = createClient;
