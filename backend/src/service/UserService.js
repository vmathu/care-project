const { UserRepository } = require('../database')

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async SignUp(userInfo) {
        const { name, email, password } = userInfo;

        try {
            const existingUser = await this.repository.findUser({ email });

            if(existingUser.length > 0) {
                throw new Error('User already exists');
            } else {
                const user = await this.repository.createUser({ name, email, password });
                return user;
            }
        } catch (err) {
            console.log('UserService.SignUp', err);
        }
    }

    async getAllUsers() {
        try {
            const users = await this.repository.getAllUsers();
            return users;
        } catch (err) {
            console.log('UserService.getAllUsers', err);
        }
    }
}

module.exports = UserService;