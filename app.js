const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

const PORT =  process.env.PORT || 8000;
const dbURI = process.env.DB_KEY;
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((result)=> app.listen(PORT, console.log(`Connected to DB Server running on http://localhost:${PORT}`)))
    .catch((err)=>console.log(err))


app.set('view engine', 'ejs')


app.get('/', (req,res)=>{
    res.render('index', {title:'Home Page'})
});

app.get('/about', (req,res)=>{
    res.render('about', {title:'About'})
})

app.get('/login', (req, res)=> {
    res.render('login', {title:'Login'})
})

app.get('/register', (req,res)=>{
    res.render('register', {title:'Register'})
})