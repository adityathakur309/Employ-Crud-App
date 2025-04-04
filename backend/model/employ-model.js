const mongoose = require("mongoose");

// comploy schema 
const employerSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    designation:{type:String,required:true},
    department:{type:String,required:true},
    dateOfJoining:{type:String,required:true},
    

});

// end 
// employer model 
const employerModel = mongoose.model("employer",employerSchema);
module.exports=employerModel;
// end 