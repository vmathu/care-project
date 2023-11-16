const UserService = require('../service/UserService');

module.exports = (app) => {
    const service = new UserService();

    app.post("/SignUp", async (req, res) => {
        try {
            const { email, password, fullname, phone, role } = req.body;
            const { data } = await service.SignUp({ email, password, fullname, phone, role });
            return res.json(data);
        } catch (err) {
            return res.status(500).json({ message: 'User Already Exists' });
        }
    })

    app.get("/getAllUsers", async (req, res) => {
        try {
            const data = await service.getAllUsers();
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ message: 'Error' });
        }
    })
}