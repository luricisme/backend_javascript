

// JSON
// 1. Là một định dạng dữ liệu (Chuỗi)
// 2. JavaScript Object Notation
// 3. JSON: Number, String, Boolean, Null, Aray, Object

// Mã hóa / Giải mã
// Encode / Decode
// Stringify --> Từ json sang javascript
// Parase  --> Từ javascript sang json


// Chuỗi JSON thể hiện Array
//var json = '["Javascript, "PHP"]';

var json = '{"name":"Luric", "age":20}';

var a = '1';
console.log(JSON.parse(a));


var object = JSON.parse(json);
console.log(object);

console.log(JSON.stringify("abc"));