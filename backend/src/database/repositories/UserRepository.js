const { UserModel } = require('../models');
const { find } = require('../models/User');

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

    async findUserById({id}) {
        try {
            const existingUser = await UserModel.findById(id);
            return existingUser;
        } catch (err) {
            console.log('UserRepository.findUserById', err);
        }
    }

    async getBasicInfo({id}) {
        try {
            const user = await UserModel.findById(id).select('fullname phone email');;
            return user;
        } catch (err) {
            console.log('UserRepository.getBasicInfo', err);
        }
    }

    async changeBasicInfo({id, fullname, phone}) {
        try {
            const res = await UserModel.updateOne({_id: id}, {fullname, phone});
            return res;
        } catch (err) {
            console.log('UserRepository.changeBasicInfo', err);
        }
    }

    async changePassword({id, newPassword}) {
        try {
            const res = await UserModel.updateOne({_id: id}, {password: newPassword});
            return res;
        } catch (err) {
            console.log('UserRepository.changePassword', err);
        }
    }

    async deleteAccount({id}){
        try {
            const res = await UserModel.updateOne({_id: id}, {status: 'disabled'});
            return res;
        } catch (err) {
            console.log('UserRepository.deleteAccount', err);
        }
    }
}

module.exports = UserRepository;