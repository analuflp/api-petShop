const Item = require('../model/Item');
const { connect } = require('../Database/database.js');
const GeneralResponseError = require('../exception/GeneralResponseError')

connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  });

module.exports.execute = async (req) => {

    try {
        const items = await Item.find();

        return {
            statusCode: 200,
            body: JSON.stringify(items)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(new GeneralResponseError(500, 'Error fetching items'))
        }

    }

}

