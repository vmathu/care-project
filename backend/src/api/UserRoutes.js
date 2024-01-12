const {UserService} = require('../services');

module.exports = (app) => {
    const service = new UserService();

    app.post("/user/register", async (req, res, next) => {
        try {
            const { email, password, fullname, phone, role } = req.body;
            if (!email || !password || !fullname || !phone || !role) {
                throw { message: 'Thiếu thông tin ', status: RespondStatus.BAD_REQUEST };
            }
            const result  = await service.Register({ email, password, fullname, phone, role });
            return res.json(result);
        } catch (err) {
            res.json({ data: 'fail',  message: err.message, status: err.status });
        }
    })

    app.post("/user/login", async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw { message: 'Thiếu thông tin ', status: RespondStatus.BAD_REQUEST };
            }
            const result = await service.Login({ email, password });
            return res.json(result);
        } catch (err) {
            res.json({ data: 'fail',  message: err.message, status: err.status });
        }
    })

    app.post("/user/get-basic-info", async (req, res, next) => {
        try {
            const { id } = req.body;
            if (!id ) {
                throw { message: 'Thiếu thông tin ', status: RespondStatus.BAD_REQUEST };
            }
            const result = await service.getBasicInfo({ id });
            return res.json(result);
        } catch (err) {
            res.json({ data: 'fail',  message: err.message, status: err.status });
        }
    })

    app.post("/user/change-basic-info", async (req, res, next) => {
        try {
            const { id, fullname, phone } = req.body;
            if (!id || !fullname || !phone) {
                throw { message: 'Thiếu thông tin ', status: RespondStatus.BAD_REQUEST };
            }
            const result = await service.changeBasicInfo({ id, fullname, phone });
            return res.json(result);
        } catch (err) {
            res.json({ data: 'fail',  message: err.message, status: err.status });
        }
    })

    app.post("/user/change-password", async (req, res, next) => {
        try {
            const { id, oldPassword, newPassword } = req.body;
            if (!id || !newPassword || !oldPassword) {
                throw { message: 'Thiếu thông tin ', status: RespondStatus.BAD_REQUEST };
            }
            const result = await service.changePassword({ id, oldPassword, newPassword });
            return res.json(result);
        } catch (err) {
            res.json({ data: 'fail',  message: err.message, status: err.status });
        }
    })

    app.post("/user/delete-account", async (req, res, next) => {
        try {
            const { id } = req.body;
            if (!id ) {
                throw { message: 'Thiếu thông tin ', status: RespondStatus.BAD_REQUEST };
            }
            const result = await service.deleteAccount({ id });
            return res.json(result);
        } catch (err) {
            res.json({ data: 'fail',  message: err.message, status: err.status });
        }
    })
}