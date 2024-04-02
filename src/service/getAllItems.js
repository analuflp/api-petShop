const Item = require('../model/Item');

module.exports.execute = async (req) => {

    const items = await Item.find();

    return {
        statusCode: 200,
        body: JSON.stringify(items)
    };
}

