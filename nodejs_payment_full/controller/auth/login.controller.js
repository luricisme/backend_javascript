const bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');
const jwt = require('jsonwebtoken');

class LoginController {
    async getLoginPage(req, res) {
        res.render('login');
    }

    async handleLogin(req, res) {
        const { username, password } = req.body;
        try {
            const user = await userModel.findOneByUsername(username);
            if (!user || !(await bcrypt.compare(password, user.Password))) {
                return res.render('login', { message: 'Login failed' });
            }
            const match = await bcrypt.compare(password, user.Password);
            if (!match) {
                return res.render('login', { message: 'Incorrect password' });
            }

            // await userModel.updateIsOnline(username, true);
            const payload = { Username: username };
            const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
            res.cookie('jwt', token, { httpOnly: true });
            return res.redirect('/');
        } catch (err) {
            res.render('login', { error: err.message });
        }
    }
}

module.exports = new LoginController();