const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce2');

let user = mongoose.Schema({
  producttype : String,
  title : String,
  size : String,
  image : String,
  price : String
})


module.exports = mongoose.model('userlist', user);

