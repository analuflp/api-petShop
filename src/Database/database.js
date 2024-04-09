
const mongoose = require('mongoose');

module.exports.connect = async function () {
  try {
    await mongoose.connect('mongodb+srv://anafelipe:s2V6sEJwysTfDY1x@api-pet-items.9smgffl.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}


