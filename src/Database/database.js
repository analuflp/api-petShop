
const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://anafelipe:s2V6sEJwysTfDY1x@api-pet-items.9smgffl.mongodb.net/?retryWrites=true&w=majority&appName=api-pet-items', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connect };
