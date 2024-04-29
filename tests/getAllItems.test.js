const { execute } = require('../src/service/getAllItems');
const Item = require('../src/model/Item');
const GeneralResponseError = require('../src/exception/GeneralResponseError');

jest.mock('../src/model/Item');

describe('execute', () => {
  it('should return status code 200 and items data on success', async () => {
   
    const mockItems = [{ name: 'Item 1', description: 'Description 1', price: 10.99 }, { name: 'Item 2', description: 'Description 2', price: 20.99 }];
    Item.find.mockResolvedValueOnce(mockItems);

  
    const response = await execute();

    
    expect(Item.find).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(mockItems);
  });

  it('should return status code 500 and error message on failure', async () => {
   
    const errorMessage = 'Error fetching items';
    const error = new Error(errorMessage);
    Item.find.mockRejectedValueOnce(error);

    
    const response = await execute();

    
    expect(Item.find).toHaveBeenCalled();
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(JSON.stringify(new GeneralResponseError(500, errorMessage)));
  });
});
