const User = require("../models/User");

class UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findById(id) {
    return await User.findById(id).select("-password");
  }

  async findByEmails(emails) {
    return await User.find({ email: { $in: emails } }).select("-password");
  }
}

module.exports = new UserRepository();