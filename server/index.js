const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact")
const cors = require("cors");
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: "*",
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser()); 

const createClient = require("./config/db");

let conn;

(async () => {
  try {
    conn = await createClient(); 
  } catch (err) {
    console.error("Error initializing database client:", err);
  }
  finally{
    
    // const data = await conn.execute('select * from contacts')
    // console.log(data);
    
  }
})();


require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.get('/', async(req, res)=>{
  res.status(200).json({"msg": "server running"})
})



app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

