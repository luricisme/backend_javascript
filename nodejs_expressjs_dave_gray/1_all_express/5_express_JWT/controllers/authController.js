const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'Username and password are required.'});
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser){
        return res.sendStatus(401); // Unauthorized
    }
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles);
        // Create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s'}
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        );

        // Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
        // Đặt một cookie trên trình duyệt của người dùng
        // Phương thức này dùng để gán 1 cookie vào phản hồi HTTP
        // 'jwt' là tên của cookie
        // refreshToken là giá trị của cookie
        // httpOnly: true --> Chỉ có thể truy cập bởi máy chủ thông qua http và không thể chỉnh sửa bởi Javascript trên trình duyệt --> Tránh khỏi cuộc tấn công XSS (Cross-Site Scripting)
        // sameSite: 'None' --> Cho phép cookie được gửi kèm theo các yêu cầu chéo miền (Nếu ứng dụng hoạt động trên nhiều miền)
        // secure: true --> Cookie chỉ được gửi qua các kết nối Https
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };