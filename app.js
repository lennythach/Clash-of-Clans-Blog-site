const express = require('express');

const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
//Connecting to our Database and accessing a PORT
const PORT =  process.env.PORT || 8000;
const dbURI = process.env.DB_KEY;
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((result)=> app.listen(PORT, console.log(`Connected to DB Server running on http://localhost:${PORT}`)))
    .catch((err)=>console.log(err))

// Register our view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.render('index', {title:'Home Page'});
});

app.get('/about', (req,res)=>{
    res.render('about', {title:'About'});
});

app.use(authRouter);

app.get('/set-cookies', (req, res)=>{
    // res.setHeader('Set-Cookie', 'newUser=true');
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.send('you got cookie');
});

app.get('/read-cookies', (req, res)=>{
    const cookies = req.cookies;
    console.log(cookies);
    res.json(cookies);
});