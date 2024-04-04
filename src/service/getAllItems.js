const Item = require('../model/Item');
const GeneralResponseError = require('../exception/GeneralResponseError')

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

