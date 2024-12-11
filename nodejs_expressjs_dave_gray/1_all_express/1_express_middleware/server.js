const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger) 

// Cross Origin Resource Sharing
// Đây là liệt kê ra những trang có thể lấy dữ liệu từ server backend của bạn
// Khi bạn xây dựng theo kiểu trả API cho front end thì phải có cái này 
// để frontend có thể lấy dữ liệu từ backend
const whitelist = ['https://www.google.com', 'http://localhost:3500'];
const corsOptions = {
    // origin: (origin, callback) => {
    //     if(whitelist.indexOf(origin) != -1){
    //         callback(null, true);
    //     } else{
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    origin: '*',
    optionsSucessStatus: 200
}
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
// CÔNG DỤNG: Xử lý dữ liệu khi gửi form
// Nếu không có dòng này nó sẽ bị undefined khi gửi lên req.body
app.use(express.urlencoded({extended: false}));

// Built-in middleware for json
// Phân tích nội dung JSON để dễ dàng xử lý 
// Rất hữu ích  cho các RESTful API
// Nếu không dùng nó sẽ bị undefined 
app.use(express.json());

// Server static files 
// Dùng để xử dụng các file js, css, text, img trong public
// Nó thì show ra cho public: Có nghĩa là khi mà bạn gõ tên file lên đường dẫn thì nó sẽ hiển thị ra nội dung file mà bạn gõ đó
app.use(express.static(path.join(__dirname, '/public')));


app.get('/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); // 302 by default 
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

// Chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.end('Finished!');
}

app.get('/chain(.html)?', [one, two, three]);

// Phải bỏ nó ở cuối tại vì nó chạy vào đây trước
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')) {
        res.json({error: "404 not found"});
    }else {
        res.type(txt).send("404 not found");
    }
    
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



