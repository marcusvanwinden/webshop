const express = require('express');
const app = express();
const products = require('./routes/products');
const MongoClient = require('mongodb').MongoClient;
const ProductsDAO = require('./database/productsDAO');
require('dotenv').config();

app.use('/products', products);

app.get('/', (req, res) => {
  res.send('Welcome to the webshop API');
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

MongoClient.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  writeConcern: 'majority',
})
  .then(async (client) => {
    await ProductsDAO.injectDB(client);
    app.listen(process.env.PORT, () => {
      console.log(`Server listening at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
