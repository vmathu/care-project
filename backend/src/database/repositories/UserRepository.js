const { UserModel } = require('../models');

class UserRepository  {
    async createUser({ email, password, fullname, phone, role }) {
        try {
            const user = new UserModel({ email, password, fullname, phone, role });
            const result = await user.save();
            return result;
        } catch (err) {
            console.log('UserRepository.createUser', err);
        }
    }
    
    async getAllUsers() {
        try {
            const users = await UserModel.find();
            return users;
        } catch (err) {
            console.log('UserRepository.getAllUsers', err);
        }
    }

    async findUser({email}) {
        try {
            const existingUser = await UserModel.find({email});
            return existingUser;
        } catch (err) {
            console.log('UserRepository.findUser', err);
        }
    }
}

module.exports = UserRepository;