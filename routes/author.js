const mongoose  = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce2');

const userSchem = mongoose.Schema({
  username : String,
  email : String,
  password : String,
  mobile : Number,
  address : String
})

module.exports = mongoose.model('author', userSchem);
