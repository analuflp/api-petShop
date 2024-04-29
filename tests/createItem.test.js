const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { execute } = require('../src/service/createItem');
const Item = require('../src/model/Item');
const GeneralResponseError = require('../src/exception/GeneralResponseError');


jest.mock('../src/model/Item');

describe('createItemService', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri()
    
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await Item.deleteMany({});
  });

  it('should create a new item and return it with status code 201', async () => {
    
    const event = {
      body: JSON.stringify({
        name: 'Test Item',
        description: 'This is a test item',
        price: 9.99,
        image_url: 'https://example.com/image.jpg'
      })
    };
    const newItem = {
      _id: 'mockedId',
      name: 'Test Item',
      description: 'This is a test item',
      price: 9.99,
      image_url: 'https://example.com/image.jpg'
    };
    Item.prototype.save.mockResolvedValue(newItem);

    
    const response = await execute(event);

    
    expect(Item).toHaveBeenCalledWith({
      name: 'Test Item',
      description: 'This is a test item',
      price: 9.99,
      image_url: 'https://example.com/image.jpg'
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body)).toEqual(newItem);
  });

  it('should return a 500 error if there is an error creating the item', async () => {
    
    const event = {
      body: JSON.stringify({
        name: 'Test Item',
        description: 'This is a test item',
        price: 9.99,
        image_url: 'https://example.com/image.jpg'
      })
    };
    const errorMessage = 'Error creating item';
    const error = new Error(errorMessage);
    Item.prototype.save.mockRejectedValue(error);

    
    const response = await execute(event);

    
    expect(Item).toHaveBeenCalledWith({
      name: 'Test Item',
      description: 'This is a test item',
      price: 9.99,
      image_url: 'https://example.com/image.jpg'
    });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual(new GeneralResponseError(400, errorMessage));
  });
});
