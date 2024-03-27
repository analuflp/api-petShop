const express = require('express')
const mongoose = require('mongoose')


const app = express()
const port = 3000
mongoose.connect('mongodb+srv://anafelipe:<password>@api-pet-items.9smgffl.mongodb.net/?retryWrites=true&w=majority&appName=api-pet-items');


const Item = mongoose.model('Item', { 
    name: String,
    description: String,
    price: Number,
    image_Url: String

});

app.get("/", (req,res) => {
    res.send("")
})

app.listen(port, () => {
    console.log(` app listening on port ${port}`)
  })