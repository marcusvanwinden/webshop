const express = require('express');
const router = express.Router();
const Products = require('../database/product');

router.get('/login', async (req, res) => {
  const products = await Products.getAllProducts();
  console.log(products);
  console.log(req.session.name);
  res.send('Login');
});

router.get('/register', (req, res) => {
  req.session.name = 'Marcus';
  res.send('Register');
});

router.get('/user', (req, res) => {
  res.send('User');
});

module.exports = router;
