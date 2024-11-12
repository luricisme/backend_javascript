const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

// Dùng cái này để khi gặp path này thì phải kiểm tra file tĩnh trong thư mục
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

// Template engine
// Định nghĩa handlebars bằng cái handlebars()
app.engine('.hbs', engine({extname: '.hbs'}));
// Set view engine bằng cái vừa định nghĩa ở trên
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// console.log('PATH: ', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});