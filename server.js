require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const connectDB = require('./config/db');
const router = require('./routes/user');
const cors = require('cors');
const bookRoutes = require('./routes/books');
const cartRoutes = require('./routes/cart');


  
app.use(cors(
  {
    origin: ["https://deploy-mern-1whq.vercel.app"],
    method: ["POST","GET","PUT","DELETE"],
    credentials: true
  }
));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req, res)=>{
    return res.send("Ok");
})
// Routes
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);


app.use('/api/user',router);
connectDB();


app.listen(port,()=>{
    console.log('server is running successfully on port 8000');
})
