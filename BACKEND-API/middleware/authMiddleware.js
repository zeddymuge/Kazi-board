const jwt = require('jsonwebtoken');
const User = require('../models/authModel')
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, 'nyef secret', (error, decodedToken) => {
            if (error){
                console.log(err.message);
                res.redirect('\login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('\login');
    }
}; 

//check current user logged in

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, 'nyef secret', async (error, decodedToken) => {
            if (error){
                console.log(err.message);
                es.locals.user = null;
                next();
            }
            else{
                console.log(decodedToken);
                let foundUser = await User.findById(decodedToken.id); // Assuming you have a User model defined
                // Make it accessible from the views
                res.locals.user = foundUser;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();
    }
}; 

module.exports = {requireAuth, checkUser};

