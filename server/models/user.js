let users;

class User {
  static async inject(connection) {
    if (users) return;

    try {
      users = connection.db(process.env.DB_NAME).collection('users');
    } catch (error) {
      console.error(
        `Unable to establish a collection handle in User: ${error}`
      );
    }
  }

  static async getAllUsers() {
    const result = await users.find().toArray();

    return result;
  }

  static async getUserByUsername(username, callback) {
    try {
      const result = await users.findOne({ username: username });

      return callback(null, result);
    } catch (error) {
      return callback(error, null);
    }
  }

  static async getUserById(id, callback) {
    try {
      const result = await users.findOne({ _id: id });

      return callback(null, result);
    } catch (error) {
      return callback(error, null);
    }
  }

  static async createUser(username, password) {
    const result = await users.insertOne({ username, password });

    return result;
  }
}

module.exports = User;
