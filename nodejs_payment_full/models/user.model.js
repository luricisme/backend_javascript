const db = require('../config/db')('public');

module.exports = {
    findOneByUsername: async (field) => {
        try {
            const user = await db.one('Users', 'Username', field);
            return user;
        } catch (err) {
            throw new Error(`Error finding user by username: ${err.message}`);
        }
    },
    createUser: async (username, password, name, email, dob, permission) => {
        try {
            const user = {
                Username: username,
                Password: password,
                Name: name,
                Email: email,
                DOB: dob,
                Permission: permission
            };
            const newUser = await db.add('Users', user);
            return newUser;
        } catch (err) {
            throw new Error(`Error creating user: ${err.message}`);
        }
    },
    updateIsOnline: async (userName, isOnline) => {
        try {
            await db.update('Users',{ IsOnline: isOnline}, 'Username', userName);
        } catch (err) {
            throw new Error(`Error updating user's online status: ${err.message}`);
        }
    },
    getOnlineUsers: async() => {
        try{
            const onlineUsers = await db.allByField('Users', 'IsOnline', true);
            console.log('ONLINE USERS: ', onlineUsers);
            return onlineUsers;
        } catch(err){
            throw new Error(`Error getting online users: ${err.message}`);
        }
    }
}