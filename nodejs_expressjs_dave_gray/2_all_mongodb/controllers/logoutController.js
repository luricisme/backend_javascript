const User = require('../model/User');

handleLogout = async (req, res) => {
    // On client, also delete the accesstoken

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // Is refreshtoken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if(!foundUser){
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); // secure: true
        res.sendStatus(204);
    };
    
    // Delete refreshtoken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save(); // Update the document on Database
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true , maxAge: 24 * 60 * 60 * 1000 }); // secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout }