const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data;
    }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user , pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'Username and password are required. '});
    // Check for duplicate
    const duplicate = usersDB.users.find(person => person.username === user);
    if(duplicate) return res.sendStatus(409); // Conflict
    try{
        // Encrypt the password
        const hashPwd = await bcrypt.hash(pwd, 10);
        // Store new user   
        const newUser = {'username': user, 'password': hashPwd};
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            // Convert object to JSON string and store in the path 
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({'success': `New user ${user} created!`});
    } catch(err){
        res.status(500).json({'message': err.message})
    }
}

module.exports = { handleNewUser };