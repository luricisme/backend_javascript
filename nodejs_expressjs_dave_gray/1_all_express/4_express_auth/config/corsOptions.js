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

module.exports = corsOptions;