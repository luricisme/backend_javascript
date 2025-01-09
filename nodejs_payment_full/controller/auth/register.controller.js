const bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');
const passport = require('../../config/passport');

class RegisterController {
    async getRegisterPage(req, res) {
        res.render('register');
    }

    async handleNewUser(req, res) {
        const { username, password, name, email, dob, permission } = req.body;
        // console.log('REGISTER req.body: ', req.body);
        if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required. ' });

        // Tìm kiếm user theo username
        const duplicate = await userModel.findOneByUsername(username);
        // console.log('DUPLICATE: ', duplicate);
        if (duplicate) return res.sendStatus(409); // Conflict

        try {
            const hashPwd = await bcrypt.hash(password, 10);
            const result = await userModel.createUser(username, hashPwd, name, email, dob, permission);

            // console.log(`New user ${username} created!`);
            // console.log(result);
            res.status(201).render('login', { message: `New user ${username} created! Please login.` });
        } catch (err) {
            console.error(`Error register: ${err.message}`);
            res.status(500).render('register', { message: 'Internal server error' });
        }
    }
}
module.exports = new RegisterController();