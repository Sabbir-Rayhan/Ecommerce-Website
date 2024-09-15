const mongoose  = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce2');

const homepage = mongoose.Schema({
  producttype : String,
  imageurl : String
})

module.exports = mongoose.model('Home', homepage);
