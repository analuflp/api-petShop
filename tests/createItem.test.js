// Importe as dependências necessárias
const { execute } = require('../src/service/createItem');
const Item = require('../src/model/Item');
const GeneralResponseError = require('../src/exception/GeneralResponseError');

// Mock do modelo Item
jest.mock('../src/model/Item');

describe('createItemService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new item and return it with status code 201', async () => {
    // Arrange
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

    // Act
    const response = await execute(event);

    // Assert
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
    // Arrange
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

    // Act
    const response = await execute(event);

    // Assert
    expect(Item).toHaveBeenCalledWith({
      name: 'Test Item',
      description: 'This is a test item',
      price: 9.99,
      image_url: 'https://example.com/image.jpg'
    });
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual(new GeneralResponseError(500, errorMessage));
  });
});
