const { MongoClient } = require('mongodb');
const Product = require('../models/product');
const User = require('../models/user');

async function initializeDatabase() {
  const client = new MongoClient(process.env.DB_URI, {
    retryWrites: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: 'majority',
  });

  try {
    await client.connect();
    await Product.inject(client);
    await User.inject(client);
  } catch (error) {
    console.error(error);
  }
}

module.exports = initializeDatabase;
