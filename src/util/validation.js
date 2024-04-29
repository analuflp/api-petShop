
const Ajv = require('ajv');
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv)

const ItemSchema = {
  type: 'object',
  properties: {
    name: { type: 'string',
            pattern: '^[a-zA-ZÀ-ÚÜÇçãẽĩõũÁÉÍÓÕÚÜáéíóõúü\\s]*$',
             },
    description: { type: 'string' },
    price: { type: 'number',
              minimum: 1,
               },
    image_url: { type: 'string' }
  },
  required: ['name', 'description', 'price', 'image_url']
};

const validateItem = ajv.compile(ItemSchema)

module.exports = {
  validateCreateItem: (item) => {
    const valid = validateItem(item);
    if (!valid) {
      throw new Error(validateItem.errors[0].message);
    }
  },

  }

