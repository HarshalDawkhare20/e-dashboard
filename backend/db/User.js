// // for defining schemas we have created this file

// const mongoose=require('mongoose');

// const userSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String
// });

// // first field is equal to the collection in the database
// module.exports=mongoose.model("users",userSchema);



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("users", userSchema);