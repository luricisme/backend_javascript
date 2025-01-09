const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const userModel = require('../models/user.model');

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile', 'email'] // Đảm bảo bạn yêu cầu quyền truy cập email
},
    async function verify(issuer, profile, cb) {
        try {
            // Kiểm tra nếu profile.emails có tồn tại và có ít nhất một email
            const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

            if (!email) {
                return cb(new Error("No email found for user"));
            }

            // Kiểm tra xem người dùng đã tồn tại trong database chưa
            const existingUser = await userModel.findOneByUsername(profile.id);
            console.log('EXISTING USER: ', existingUser);
            if (!existingUser) {
                // Nếu chưa có, tạo người dùng mới
                const newUser = await userModel.createUser(
                    profile.id, // ID Google làm tên đăng nhập
                    "", // Mật khẩu null vì chúng ta đang dùng OAuth
                    profile.displayName, // Tên người dùng
                    email, // Email của người dùng
                    "1900-01-01", // Ngày sinh có thể bỏ qua
                    1 // Quyền hạn của người dùng
                );
                return cb(null, newUser);
            } else {
                // Người dùng đã tồn tại
                // await userModel.updateIsOnline(profile.id, true);
                return cb(null, existingUser);
            }
        } catch (err) {
            return cb(err);
        }
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user.Username); // Lưu trữ ID người dùng trong session
});

passport.deserializeUser(async function (id, cb) {
    try {
        const user = await userModel.findOneByUsername(id); 
        cb(null, user); 
    } catch (err) {
        cb(err);
    }
});

