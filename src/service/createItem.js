const Item = require('../model/Item');
const { connect } = require('../Database/database.js')
const {validateCreateItem} = require ('../util/validation.js')
const GeneralResponseError = require('../exception/GeneralResponseError.js');



connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  });



module.exports.execute = async (event) => {
    try {
      const body = JSON.parse(event.body);
      validateCreateItem(body);
      
  
      const { name, description, price, image_url } = body;
      const newItem = new Item({ name, description, price, image_url });
      const savedItem = await newItem.save();
      return {
        statusCode: 201,
        body: JSON.stringify(savedItem)
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify(new GeneralResponseError(400, error.message))
      };
    }
  };