const jwt = require('jsonwebtoken');

// Middleware để đảm bảo người dùng đã đăng nhập
function ensureAuthenticated(req, res, next) {
    // Kiểm tra session trước
    if (req.isAuthenticated && req.isAuthenticated()) {
        // Nếu Passport đã xác thực (Google OAuth), tiếp tục
        return next();
    }

    // Sau đó kiểm tra JWT
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
            if (err) {
                return res.redirect('/login'); // JWT không hợp lệ
            }
            req.user = decoded; // Lưu thông tin người dùng từ JWT vào req.user
            // console.log('USER: ', decoded);
            return next(); // Tiếp tục
        });
    } else {
        // Nếu không có JWT và không có session hợp lệ
        return res.redirect('/login');
    }
}

function preventAuthenticatedAccess(req, res, next) {
    // Kiểm tra xem người dùng đã được xác thực qua Passport session chưa
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.redirect('/'); // Đã đăng nhập bằng session, chặn truy cập login/register
    }

    // Kiểm tra JWT (có trong cookie)
    const token = req.cookies.jwt;
    if (token) {
        // Xác thực JWT
        const jwt = require('jsonwebtoken');
        jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
            if (err) {
                return next(); // Token không hợp lệ, cho phép truy cập
            }
            return res.redirect('/'); // Đã đăng nhập bằng JWT, chặn truy cập login/register
        });
    } else {
        return next(); // Chưa đăng nhập, cho phép truy cập login/register
    }
}

module.exports = {
    ensureAuthenticated,
    preventAuthenticatedAccess
};
