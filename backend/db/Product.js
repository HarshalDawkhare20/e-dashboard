// // for defining schemas we have created this file

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: String,
//   price: String,
//   category: String,
//   userId:String,
//   company:String
// });

// // first field is equal to the collection in the database
// module.exports = mongoose.model("products", productSchema);




const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
});

module.exports = mongoose.model("products", productSchema);