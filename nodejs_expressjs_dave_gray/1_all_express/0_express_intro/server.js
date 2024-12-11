const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// Ở ngay đây ta có thể set up đường dẫn để có thể có .html hoặc không có
// Nhưng cách sendFile này khá là bất tiện và không hiệu quả 
// app.get('/', (req, res) => {
//     // res.send('Hello world!');
//     // res.sendFile('./views/index.html', { root: __dirname });
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// })

// app.get('/new-page.html', (req, res) => {
//     // res.send('Hello world!');
//     // res.sendFile('./views/index.html', { root: __dirname });
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// })

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); // 302 by default 
})

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello world!');
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
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



