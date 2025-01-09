const bcrypt = require('bcrypt');
const passport = require('../../config/passport');
const userModel = require('../../models/user.model');
const jwt = require('jsonwebtoken');

// class LogoutController {
//     async handleLogout(req, res, next) {
//         // Xóa JWT (nếu có)
//         res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

//         // Kiểm tra và xử lý logout bằng Google OAuth
//         if (req.isAuthenticated && req.isAuthenticated()) {
//             // Passport session logout
//             req.logout((err) => {
//                 if (err) {
//                     return next(err); // Nếu có lỗi khi logout, truyền sang middleware lỗi
//                 }
//                 return res.redirect('/login'); // Chuyển hướng về trang đăng nhập sau khi logout
//             });
//         } else {
//             // Nếu không dùng session (chỉ dùng JWT), chuyển hướng về trang đăng nhập
//             res.redirect('/login');
//         }
//     }
// }

class LogoutController {
    async handleLogout(req, res, next) {
        try {
            // Xử lý logout với JWT (cookie)
            if (req.cookies.jwt) {
                // Giải mã JWT từ cookie để lấy thông tin người dùng
                const decoded = jwt.verify(req.cookies.jwt, 'your_jwt_secret');
                const username = decoded.username; // Giả sử bạn đã lưu `username` trong payload của JWT

                // Cập nhật trạng thái isOnline về false
                await userModel.updateIsOnline(username, false);

                // Xóa JWT khỏi cookie
                res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            }

            // Xử lý logout với Passport (session)
            if (req.isAuthenticated && req.isAuthenticated()) {
                // Cập nhật trạng thái isOnline trước khi logout
                await userModel.updateIsOnline(req.user.Username, false);

                // Passport session logout
                req.logout((err) => {
                    if (err) {
                        return next(err); // Nếu có lỗi khi logout, truyền sang middleware lỗi
                    }
                    return res.redirect('/login'); // Chuyển hướng về trang đăng nhập sau khi logout
                });
            } else {
                // Nếu không dùng session (chỉ dùng JWT), chuyển hướng về trang đăng nhập
                res.redirect('/login');
            }
        } catch (err) {
            return next(err); // Nếu có lỗi trong quá trình logout, truyền qua middleware lỗi
        }
    }
}

module.exports = new LogoutController();
