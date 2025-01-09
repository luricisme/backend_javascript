const express = require('express');
const router = express.Router();
const registerController = require('../controller/auth/register.controller');
const loginController = require('../controller/auth/login.controller');
const logoutController = require('../controller/auth/logout.controller');
const authMiddleware = require('../middleware/auth.middleware');
const passport = require('passport');
const passport_gg = require('../config/passport_gg');

// NORMAL
router.get('/register', authMiddleware.preventAuthenticatedAccess, registerController.getRegisterPage);
router.post('/register', registerController.handleNewUser);
router.get('/login', authMiddleware.preventAuthenticatedAccess, loginController.getLoginPage);
router.post('/login', loginController.handleLogin);
router.post('/logout', logoutController.handleLogout);

// GOOGLE
router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/',   
    failureRedirect: '/login'
})); 
module.exports = router;