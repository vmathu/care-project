const { UserModel } = require('../models');

class UserRepository  {
    async createUser({ name, email, password }) {
        try{
            const user = new UserModel({ name, email, password });
            const result = await user.save();
            return result;
        } catch (err) {
            console.log('UserRepository.createUser', err);
        }
    }
    
    async getAllUsers() {
        try{
            const users = await UserModel.find();
            return users;
        } catch (err) {
            console.log('UserRepository.getAllUsers', err);
        }
    }

    async findUser({email}) {
        try {
            const existingUser = await UserModel.find({email});
            return existingUser
        } catch (err) {
            console.log('UserRepository.findUser', err);
        }
    }
}

module.exports = UserRepository;