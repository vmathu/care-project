const { UserRepository } = require('../database')
const ResponedData  = require('../utils/ResponedData');
class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async SignUp(userInfo) {
        const { email, password, fullname, phone, role } = userInfo;

        try {
            const existingUser = await this.repository.findUser({ email });

            if (existingUser.length > 0) {
                throw {message: 'Đã có tài khoản sử dụng email này', status: 409}
            } else {
                const user = await this.repository.createUser({ email, password, fullname, phone, role });
                if (!user)
                    throw {message: 'Gặp lỗi khi tạo tài khoản', status: 409}
                else
                    return ResponedData(user, 'Tạo tài khoản thành công', 200);
            }
        } catch (err) {
            return ResponedData(null, err.message, 409);
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