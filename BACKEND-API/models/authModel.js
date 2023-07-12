const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique:true,
        lowercase:true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'minimum password length is 6 characters']
    }
});

//fire a function after user is created and saved to database
userSchema.post('save', function (doc, next){
    console.log('new user was created', doc)
    next();
});
//fire a function that hash password before  is saved to database
userSchema.pre('save', async function (next){
    //console.log('new user was created', doc)
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
});

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if (user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('email is incorrect')
};

const User = mongoose.model('User', userSchema);
module.exports = User;