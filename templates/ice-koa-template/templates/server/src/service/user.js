const UserModel = require('../model/User');

class UserService {
  async profile() {
    const data = await UserModel.findUserProfile();
    return { data };
  }
}

module.exports = new UserService();
