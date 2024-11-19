const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact")


const createClient = require("./config/db");

// Initialize the client
let conn;

(async () => {
  try {
    conn = await createClient(); // Create and reuse the client connection
  } catch (err) {
    console.error("Error initializing database client:", err);
  }
  finally{
    
    const data = await conn.execute('select * from otps')
    console.log(data);
    
  }
})();


require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);



app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

