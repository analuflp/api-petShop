const express = require('express')
const mongoose = require('mongoose')


const app = express()
app.use(express.json())
const port = 3000

const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image_Url: String,
  })

const Item = mongoose.model('Item', ItemSchema);

app.get("/list-item", async  (req,res) => {
    try {
        const Items = await Item.find();
        res.status(200).send(Items)
    } catch (error) {
        res.status(500).send({error: 'Erro ao processar solicitação'})
        }
    })



app.post('/new-item', async (req, res) => {
    try {
      const requiredFields = ['name', 'price'];
      requiredFields.forEach((field) => {
        if (!req.body[field]) {
          throw new Error(`Campo '${field}' é obrigatório`);
        }
      });
  
      if (typeof req.body.price !== 'number') {
        throw new Error(`Campo 'price' deve ser um número`);
      }
  
      const item = new Item(req.body);
      const savedItem = await item.save();
  
      res.status(201).send(savedItem);
    } catch (error) {
      const errorResponse = {
        timestamp: new Date().toISOString(),
        status: 400,
        error: 'Bad Request',
        message: 'Erro ao processar a solicitação',
        errors: [
          {
            defaultMessage: error.message,
            field: error.field,
            rejectedValue: error.rejectedValue,
          },
        ],
      };
  
      
      if (error instanceof Error) {
        errorResponse.errors[0].defaultMessage = error.message;
      }
  
      res.status(400).json(errorResponse);
    }
  });
       
    



  module.exports = app
  mongoose.connect('mongodb+srv://anafelipe:s2V6sEJwysTfDY1x@api-pet-items.9smgffl.mongodb.net/?retryWrites=true&w=majority&appName=api-pet-items');


app.listen(port, () => {
    console.log(` app listening on port ${port}`)
  })