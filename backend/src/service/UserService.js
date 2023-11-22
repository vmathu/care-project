const bcrypt = require('bcrypt');
const { UserRepository } = require('../database')
const RespondData = require('../utils/ResponedData').RespondData;
const RespondStatus = require('../utils/ResponedData').RespondStatus;
const saltRounds = 10;
class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async Register(userInfo) {
        const { email, password, fullname, phone, role } = userInfo;
        try {
            const existingUser = await this.repository.findUser({ email });

            if (existingUser.length > 0) {
                throw { message: 'Đã có tài khoản sử dụng email này', status: RespondStatus.CONFLICT }
            } else {
                const hash = bcrypt.hashSync(password, saltRounds);
                const user = await this.repository.createUser({ email, password: hash, fullname, phone, role });
                if (!user)
                    throw { message: 'Gặp lỗi khi tạo tài khoản', status: RespondStatus.INTERNAL_SERVER_ERROR }
                return RespondData('success', 'Tạo tài khoản thành công', RespondStatus.SUCCESS);
            }
        } catch (err) {
            return RespondData(null, err.message, err.status);
        }
    }

    async Login(userInfo) {
        const { email, password } = userInfo;
        try {
            const user = await this.repository.findUser({ email });
            if (user.length === 0) {
                throw { message: 'Tài khoản không tồn tại', status: RespondStatus.NOT_FOUND }
            } else {
                const match = bcrypt.compareSync(password, user[0].password);
                if (match) {
                    return RespondData(user[0], 'Đăng nhập thành công', RespondStatus.SUCCESS);
                } else {
                    throw { message: 'Mật khẩu không chính xác', status: RespondStatus.UNAUTHORIZED }
                }
            }
        } catch (err) {
            return RespondData(null, err.message, err.status);
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