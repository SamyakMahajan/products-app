const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
app.use(bodyParser.json());
// app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://ketann682:ES5ET4Grarj7aQwB@cluster0.hxaffr8.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/product', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
