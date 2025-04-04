
const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.MONGO_URL;
 const connectDb= ()=>{
     mongoose.connect(DB_URL).then(()=>{
        console.log("db connected")
     }).catch((err) =>{
        console.log(`error: ${err}`)
     })

}
module.exports=connectDb