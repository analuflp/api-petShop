const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); // supondo que seu arquivo de aplicativo seja chamado index.js

// Teste para o endpoint GET
describe('GET /list-item', () => {
  it('Deve retornar status 200 e uma lista de itens', async () => {
    const response = await request(app).get('/list-item');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0); 
  });
});


describe('POST /new-item', () => {
  it('Deve criar um novo item com sucesso', async () => {
    const newItem = {
      name: 'Novo Item',
      description: 'Descrição do novo item',
      price: 10.99,
      image_Url: 'https://example.com/image.jpg',
    };
    const response = await request(app)
      .post('/new-item')
      .send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newItem); 
  })

},

)
afterAll(async () => {
  await mongoose.disconnect();
})
