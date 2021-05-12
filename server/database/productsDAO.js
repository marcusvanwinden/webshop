let products;

class ProductsDAO {
  static async injectDB(conn) {
    if (products) return;

    try {
      products = conn.db(process.env.WEBSHOP_NS).collection('products');
    } catch (err) {
      console.error(
        `Unable to establish a collection handle in productsDAO: ${err}`
      );
    }
  }

  static async getProducts() {
    const result = await products.find().toArray();
    return result;
  }
}

module.exports = ProductsDAO;
