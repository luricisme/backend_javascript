const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            // Cho phép Mongoose sử dụng cơ chế phát hiện máy chủ mới của MongoDB Driver, giảm thiểu các cảnh báo và cải thiện hiệu suất.
            // useUnifiedTopology: true,
            // Yêu cầu Mongoose sử dụng phân tích cú pháp URI mới. Lựa chọn này cũng giúp loại bỏ các cảnh báo từ MongoDB Driver.
            // useNewUrlParser: true
        });
    } catch(err){
        console.error(err);
    }
}

module.exports = connectDB;