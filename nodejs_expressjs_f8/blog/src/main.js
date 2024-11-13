const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const route = require('./routes');

const port = 3000;

// THƯ VIỆN EXPRESS 
// Dùng cái này để khi gặp path này thì phải kiểm tra file tĩnh trong thư mục
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// THƯ VIỆN MORGAN
app.use(morgan('combined'));

// THƯ VIỆN HANDLEBARS
// Template engine
// Định nghĩa handlebars bằng cái handlebars()
app.engine('.hbs', engine({extname: '.hbs'}));
// Set view engine bằng cái vừa định nghĩa ở trên
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// CÁI NÀY LÀ ROUTE
route(app);

// CÁI NÀY ĐỂ CHẠY SERVER
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});