// API: Cổng giao tiếp giữa các phần mềm

// Backend --> API --> fetch --> JSON(90% trả về này)/XML
// --> JSON.parse --> JavaScript Types
// --> Render ra giao diện với HTML

var postApi = 'https://jsonplaceholder.typicode.com/posts';
fetch(postApi)
    .then(function(response){
        return response.json();
    })
    .then(function(posts){
        console.log(posts);
    })
    .catch(function(err){
        console.log(err);
    })