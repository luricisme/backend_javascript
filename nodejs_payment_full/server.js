require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { engine } = require('express-handlebars');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
var session = require('express-session');

const route = require('./routes/index.routes');
const userModel = require('./models/user.model');

const { Server } = require('socket.io');
const { createServer } = require('http');

const PORT = process.env.PORT || 3000;

// CHECK DATABASE CONNECTION 
const dbModule = require('./config/db')('public');
(async () => {
    try {
        await dbModule.checkConnection();
        console.log('Ready to execute database operations!');
    } catch (error) {
        console.error('Unable to start due to database issues:', error.message);
    }
})();

// TEMPLATE ENGINE
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// UPLOADFILE
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.session());

// ROUTE
route(app);

// SET UP CHAT
const server = createServer(app);
const io = new Server(server);

let users = {};
io.on('connection', async socket => {
    console.log(`User ${socket.id} connected`);
    const username = socket.handshake.auth.username;
    console.log('USERNAME CONNECTED: ', username);
    if (username) {
        await setUser(socket, username);
    } else {
        console.log('Username không được cung cấp!');
        socket.disconnect(); // Ngắt kết nối nếu không có username
    }

    // Gửi danh sách online đến client
    // io.emit('online users', users);
    await sendOnlineUsers();

    socket.on('private message', async (data) => {
        const { to, message } = data;
        const recipientSocketId = users[to];
        console.log('ID NGUOI NHAN: ', recipientSocketId);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('private message', {
                from: username,
                message: message
            });
        }else {
            console.log('User not found or not online');
        }

    });

    // Xử lý sự kiện khi user ngắt kết nối
    socket.on('disconnect', async () => {
        delete users[username];
        await userModel.updateIsOnline(username, false);
        sendOnlineUsers();
    });
});

// CHAT FUNCTION
async function setUser(socket, username) {
    users[username] = socket.id;
    console.log(`User ${username} registered with ID: ${socket.id}`);
    await userModel.updateIsOnline(username, true);
}

async function sendOnlineUsers(){
    io.emit('online users', users);
}

app.use((err, req, res, next) => {
    console.error(err.stack); // In ra stack trace lỗi
    res.status(500).send('Something went wrong!'); // Gửi thông báo lỗi cho người dùng
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




