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
}

module.exports = User;
