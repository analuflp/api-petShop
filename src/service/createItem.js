const Item = require('../model/Item');

module.exports.execute = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { name, description, price, image_url } = body;

        const newItem = new Item({ name, description, price, image_url });
        const savedItem = await newItem.save();

        return {
            statusCode: 201,
            body: JSON.stringify(savedItem)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error processing request' })
        };
    }
};
