const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

class chatController {
    async getChatPage(req, res) {
        try {
            let currentUser = null;

            // Kiểm tra session trước
            if (req.isAuthenticated && req.isAuthenticated()) {
                currentUser = req.user; // Nếu đăng nhập qua Passport, lấy thông tin người dùng từ session
            }

            // Nếu không có session, kiểm tra JWT trong cookie
            if (!currentUser) {
                const token = req.cookies.jwt;
                if (token) {
                    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
                        if (err) {
                            return res.redirect('/login'); // Nếu JWT không hợp lệ, chuyển đến trang đăng nhập
                        }
                        currentUser = decoded; // Nếu JWT hợp lệ, lưu thông tin người dùng vào currentUser
                    });
                }
            }

            // Nếu không có thông tin người dùng (chưa đăng nhập)
            if (!currentUser) {
                return res.redirect('/login'); // Chuyển đến trang đăng nhập nếu không có currentUser
            }

            // Lấy danh sách người dùng online
            const onlineUsers = await userModel.getOnlineUsers();
            console.log('CURRENT: ', currentUser);

            // Lọc bỏ chính bản thân khỏi danh sách người dùng online
            const filteredUsers = onlineUsers.filter(user => user.Username !== currentUser.Username);
            
            // Tạm thời chưa làm chức năng này 
            res.render('chat', {onlineUsers: filteredUsers, currentUser});
        } catch (err) {
            console.log(err);
            res.status(500).send('Error retrieving online users');
        }
    }
}

module.exports = new chatController();