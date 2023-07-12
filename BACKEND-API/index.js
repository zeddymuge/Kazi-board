require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const bodyParser = require('body-parser');
const jobRoute = require('./routes/jobRoute');
const authRoute = require('./routes/authRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const adminRoute = require('./routes/adminRoute');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public')); 

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL
const users = []

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:false}));


app.get('*', checkUser);

app.get('/', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/logout', (req, res) => res.render('logout'));
app.get('/admin', (req, res) => res.render('admin'));
app.get('/jobs/:id', requireAuth, (req,res) => {
    res.json(jobs)
});
app.get('/', (req, res) => res.render('home'));

app.get('/jobs', requireAuth, (req,res) => {
    res.json(jobs);
});
app.use('/admin', adminRoute);
app.use('/api/Jobs', jobRoute);
app.use('/api/auth', authRoute);

// app.get('/set-cookies', (req, res) => {
//     res.cookie('newUser', false);


//     res.send('you got the cookies!')
// });
// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies.newUser);


//     res.json(cookies);
// });


app.use(errorMiddleware);

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('mongodb successfully connected')
}).catch((error)=>{
    console.log('error', error)
})

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
