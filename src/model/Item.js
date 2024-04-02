const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test')  



const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Item', ItemSchema);