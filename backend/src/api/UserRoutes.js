const UserService = require('../service/UserService');

module.exports = (app) => {
    const service = new UserService();

    app.post("/register", async (req, res, next) => {
        try {
            const { email, password, fullname, phone, role } = req.body;
            if (!email || !password || !fullname || !phone || !role) {
                throw { message: 'Thiếu thông tin ', status: 400 };
            }
            const data  = await service.SignUp({ email, password, fullname, phone, role });
            return res.json(data);
        } catch (err) {
            res.status(err.status).json({ message: err.message });
        }
    })

    app.use((req, res, next) => {
        res.status(404).json({ message: 'API not found' });
    });
}