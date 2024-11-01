var users = [
    {
        id: 1,
        name: 'Kien Dam',
    },
    {
        id: 2,
        name: 'Hung Dam',
    },
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Hello ban',
    },
    {
        id: 2,
        user_id: 2,
        content: 'Hello lai',
    },
]

// 1. Lấy comments
// 2. Từ comments lấy ra user_id
//từ user_id lấy ra tên user

// Fake API
function getComments() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(comments);
        })
    });
}

function getUsersByIds(userIds) {
    return new Promise(function (resolve) {
        var result = users.filter(function (user) {
            return userIds.includes(user.id);
        });
        setTimeout(function () {
            resolve(result);
        }, 1000)
    })
}

getComments()
    .then(function (comments) {
        var userIds = comments.map(function (comment) {
            return comment.user_id;
        });
        // console.log(userIds);
        return getUsersByIds(userIds)
            .then(function (users) {
                // console.log(users);
                return {
                    users: users,
                    comments: comments,
                };
            });
    })

    .then(function(data){
        var commentBlock = document.getElementById("comments-block");
        var html = '';
        data.comments.forEach(function(comment){
            var user = data.users.find(function(user){
                return user.id === comment.id;
            });
            html += `<li>${user.name}: ${comment.content}</li>`;
        });

        commentBlock.innerHTML = html;
    })


