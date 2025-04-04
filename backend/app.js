const  express = require("express");
const app =express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT=process.env.PORT ||5000;
const employerRouter = require("./routes/employer-Router");
const connectDb = require("./model/db");
connectDb();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

// routes 
app.use("/employer",employerRouter);
// end 


app.listen(PORT,()=>console.log(`server is running at prot ${PORT}`))