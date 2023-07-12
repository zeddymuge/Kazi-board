const User = require('../models/authModel');
const jwt = require('jsonwebtoken');

const handleErrors = (error) => {
    console.log(error.message, error.code);
    let errors = {email: '', password: ''};
    
    //incorrect email
    if (error.message === 'email is incorrect'){
        errors.email = 'email does not match the regitered one'
    }

     //incorrect password
     if (error.message === 'incorrect password'){
        errors.password = 'wrong password';
    }

    //duplicate error code
    if (error.code === 11000){
        errors.email = 'email exists.';
        //return errors;
    }

    // //validation error
    if (error.name === 'ValidationError') {
        Object.values(error.errors).forEach((error) => {
          errors[error.path] = error.message;
        });
        
      }
      return errors;
    
};

const maxAge = 1 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({id}, 'nyef secret', {
        expiresIn: maxAge
    });
};

module.exports.signup_get = (req, res) => {
    res.send('signup');
};
 
module.exports.signup_post = async(req, res) => {
   const {email, password} = req.body; 
   try {
    const user = await User.create({ email, password});
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly:true, maxAge: maxAge * 1000});
    res.status(201).json({user:user._id});
   }
    catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({errors});

   }
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body; 


    try {
     const user = await User.login( email, password);

     const token = createToken(user._id);
     res.cookie("jwt", token, { httpOnly:true, maxAge: maxAge * 1000});
     res.status(200).json({user:user._id});
    }
    catch (error) {
     const errors = handleErrors(error);
      res.status(400).json({errors});
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}