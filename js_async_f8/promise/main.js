// PROMISE
/*
- Sync: Thằng nào viết trước chạy trước thằng nào viết sau chạy sau.
- Async
 + setTimeout, setInterval, fetch, XMLHttprequest, file reading, request animation frame

 + callback: Sau 1s thì nó chạy cái function trong setTimeout.


// sleep
setTimeout(() => {
    console.log(1);
}, 1000);
console.log(2);
*/

/* Nỗi đau --> Tại sao học Promise
- Callback hell / Pyramid of doom 
*/
// setTimeout(function () {
//     console.log(1);
//     setTimeout(function () {
//         console.log(2);
//         setTimeout(function () {
//             console.log(3);
//         }, 1000);
//     }, 1000)
// }, 1000)

/* Lý thuyết, cách hoạt động: Xử lý thao tác bất động xử lý callback hell
1. new Promise
2. Executor 
*/

// 1. Pending - Chưa biết đang đợi
// 2. Fulfilled - Thành công
// 3. Rejected - Lỗi 
// var promise = new Promise(
//     // Executor
//     // Tên resolve và reject là người ta hay đặt bạn đặt khác cũng được
//     function (resolve, reject) {
//         // Logic
//         // Thành công: resolve()
//         // Thất bại: reject()
        
//         // Fake call API
//         resolve();
//     }
// );

// promise
//     // Khi resolve()
//     .then(function () {
//         console.log('Succesfully!');
//     })
//     // Khi reject()
//     .catch(function () {
//         console.log('Failure!');
//     })
//     .finally(function () {
//         console.log('Done!');
//     })

// Chain
// Return của cái .then trước là dữ liệu đầu vào của cái sau
// Nếu không return cái gì thì đằng sau nó là undefined
// Nếu nó không return ra một promise thì nó sẽ chạy ngay cái chuỗi đằng sau
// Còn nếu return ra một promise thì nó phải chờ cái promise ở đằng trước chạy xong mới truyền tới cái đằng sau
// promise
//     .then(function(){
//         return new Promise(function(resolve){
//             setTimeout(function(){
//                 resolve([1, 2, 3]);
//             }, 3000);
//         })
//     })
//     .then(function(data){
//         console.log(data);
//     })
//     .catch(function(error){
//         console.log(error);
//     })
//     .finally(function(){
//         console.log('Done!');
//     })
 

// function sleep(ms){
//     return new Promise((resolve)=>{
//         setTimeout(resolve, ms);
//     });
// }

// sleep(1000)
//     .then(function(){
//         console.log(1);
//         return sleep(1000);
//     })
//     .then(function(){
//         console.log(2);
//         return new Promise(function(resolve, reject){
//             reject('Co loi!');
//         });
//     })
//     .then(function(){
//         console.log(3);
//         return sleep(1000);
//     })
//     .then(function(){
//         console.log(4);
//         return sleep(1000);
//     })
//     .catch(function(err){
//         console.log(err);
//     })

    // 1. Promise.resolve
    // 2. Promise.reject
    // 3. Promise.all

// var promise = Promise.resolve('Success!');

// promise
//     .then(function(result){
//         console.log('result: ', result);
//     })
//     .catch(function(err){
//         console.log('err: ', err);
//     })

var promise1 = new Promise(
    function(resolve){
        setTimeout(function(){
            resolve([2, 3]);
        }, 2000);
    }
);

var promise2 = new Promise(
    function(resolve){
        setTimeout(function(){
            resolve([4, 5]);
        }, 5000);
    }
);

Promise.all([promise1, promise2])
    .then(function(result){
        console.log(result);
    });