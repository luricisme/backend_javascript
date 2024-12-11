const fsPromise = require('fs').promises;
const path = require('path');

const fileOps = async() => {
    try{
        const data = await fsPromise.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log('Old data: ', data);
        // Delete
        await fsPromise.unlink(path.join(__dirname, 'files', 'starter.txt'));
        await fsPromise.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromise.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you');
        await fsPromise.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'newPromiseWrite.txt'));

        const newData = await fsPromise.readFile(path.join(__dirname, 'files', 'newPromiseWrite.txt'), 'utf8');
        console.log('New data: ', newData);
    } catch(err){
        console.error(err);
    }
}

fileOps();

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })

// Nếu ở đây mà ta gọi Hello thì nó sẽ chạy Hello trước rồi mới xuất ra nội dung file ở trên 
//console.log('Hello...');

// Callback hell
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you', (err) => {
//     if(err) throw err;
//     console.log('Write complete');

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nMe too', (err) => {
//         if(err) throw err;
//         console.log('Append complete');

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//             if(err) throw err;
//             console.log('Rename complete');
//         })
//     })
// })

// fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), 'Testing append', (err) => {
//     if(err) throw err;
//     console.log('Append complete');
// })

// exit on uncaught errors
process.on('uncaughtException', err => {
    console.log(`There was an uncaught error: ${err}`);
    process.exit(1);
})