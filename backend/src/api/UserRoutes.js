const UserService = require('../service/UserService');
const RespondStatus = require('../utils/ResponedData').RespondStatus;
module.exports = (app) => {
    const service = new UserService();

    app.post("/user/register", async (req, res, next) => {
        try {
            const { email, password, fullname, phone, role } = req.body;
            if (!email || !password || !fullname || !phone || !role) {
                throw {data: 'fail', message: 'Thiếu thông tin ', status: RespondStatus.BAD_REQUEST };
            }
            const result  = await service.Register({ email, password, fullname, phone, role });
            return res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ data: 'fail',  message: err.message, status: err.status });
        }
    })

    app.post("/user/login", async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw { message: 'Thiếu thông tin ', status: RespondStatus.BAD_REQUEST };
            }
            const result = await service.Login({ email, password });
            return res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ data: 'fail',  message: err.message, status: err.status });
        }
    })
    
    app.use((req, res, next) => {
        res.status(RespondStatus.NOT_FOUND).json({ message: 'API not found' });
    });
}