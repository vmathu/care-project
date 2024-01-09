const bcrypt = require('bcrypt');
const { UserRepository } = require('../database')
const RespondData = require('../utils/ResponedData').RespondData;
const RespondStatus = require('../utils/ResponedData').RespondStatus;
const GenerateToken = require('../utils/ResponedData').GenerateToken;
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
            return RespondData('fail', err.message, err.status);
        }
    }

    async Login(userInfo) {
        const { email, password } = userInfo;
        try {
            const user = await this.repository.findUser({ email });
            if (user.length === 0 || user[0].status === 'disabled') {
                throw { message: 'Tài khoản không tồn tại', status: RespondStatus.NOT_FOUND }
            } else {
                const match = bcrypt.compareSync(password, user[0].password);
                if (match) {
                    const token = GenerateToken(user[0]);
                    return RespondData({
                        token,
                        user: {
                            id: user[0]._id,
                            role: user[0].role,  
                        }
                    }, 'Đăng nhập thành công', RespondStatus.SUCCESS);
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

    async getBasicInfo({id}) {
        try {
            const user = await this.repository.getBasicInfo({id});
            return user;
        } catch (err) {
            console.log('UserService.getBasicInfo', err);
        }
    }

    async changeBasicInfo({id, fullname, phone}) {
        try {
            const res = await this.repository.changeBasicInfo({id, fullname, phone});
            console.log(res)
            if (res === undefined) {
                throw { message: 'Không thể thay đổi thông tin', status: RespondStatus.CONFLICT }
            } else 
            return RespondData('success', 'Thay đổi thông tin thành công', RespondStatus.SUCCESS);
        } catch (err) {
            return RespondData('fail', err.message, err.status);
        }
    }

    async changePassword({id, oldPassword, newPassword}) {
        try {
            const user = await this.repository.findUserById({id});
            const match = bcrypt.compareSync(oldPassword, user.password);
            if (!match) {
                throw { message: 'Mật khẩu cũ không chính xác', status: RespondStatus.CONFLICT }
            }

            const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);
            const res = await this.repository.changePassword({id, newPassword: hashedPassword});
            if (res === undefined) {
                throw { message: 'Không thể thay đổi mật khẩu', status: RespondStatus.CONFLICT }
            } else 
            return RespondData('success', 'Thay đổi mật khẩu thành công', RespondStatus.SUCCESS);
        } catch (err) {
            return RespondData('fail', err.message, err.status);
        }
    }

    async deleteAccount({id}){
        try {
            const res = await this.repository.deleteAccount({id});
            if (res === undefined) {
                throw { message: 'Không thể xóa tài khoản', status: RespondStatus.CONFLICT }
            } else 
            return RespondData('success', 'Xóa tài khoản thành công', RespondStatus.SUCCESS);
        } catch (err) {
            return RespondData('fail', err.message, err.status);
        }
    }
}

module.exports = UserService;