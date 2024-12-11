const fs = require('fs');

// Khi mà xử lý với tệp lớn thì nên dùng cái này
const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' });

const ws = fs.createWriteStream('./files/new-lorem.txt');

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// })

// Hoặc
// rs.pipe(ws);

