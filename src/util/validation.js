
const Ajv = require('ajv');
const ajv = new Ajv();

const ItemSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
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
