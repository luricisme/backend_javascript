// Callback?

// Là hàm (function) được truyền qua đối số 
// Khi gọi hàm khác

// 1. là hàm
// 2. Được truyền qua đối số
// 3. Được gọi lại (Trong hàm nhận đối số) 

function myFunction(param){
    if(typeof param === 'function'){ //Kiểm tra để kĩ hơn thôi
        param();
    }
    console.log(typeof param);
}

function myCallback(){

}

// myFunction('Học lập trình');

myFunction(myCallback); //Thả hàm vào nên gọi là callback


var courses = [
    'Javascript',
    'PHP',
    'Rupy'
];

// var htmls = courses.map(function(courses){
//     return `<h2>${courses}</h2>`;
// });  
// console.log(htmls.join(''));