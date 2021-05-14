let products;

class Product {
  static async inject(connection) {
    if (products) return;

    try {
      products = connection.db(process.env.DB_NAME).collection('products');
    } catch (error) {
      console.error(
        `Unable to establish a collection handle in Product: ${error}`
      );
    }
  }

  static async getAllProducts() {
    const result = await products.find().toArray();
    return result;
  }
}

module.exports = Product;
