const express = require('express');
const authController = require("../controllers/authController");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/authModel');
// const asyncHandler = require('express-async-handler');

const router = express.Router();

// router.post('/register', asyncHandler(async(req, res) => {
//     try {
//         const {email, password} = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({email, password: hashedPassword});
//         res.status(201).json({ message: 'User created successfully' });
//     } 
//     catch (error) {
//         res.status(500).json({message: 'error registering user', error:error.message})
//     }
// }));

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);


module.exports = router;