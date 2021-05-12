const express = require('express');
const router = express.Router();
const ProductsDAO = require('../database/productsDAO');

router.get('/', async (req, res) => {
  const products = await ProductsDAO.getProducts();
  res.json(JSON.stringify(products));
});

module.exports = router;
