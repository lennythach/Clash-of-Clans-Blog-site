const express = require('express');

const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

// Register our view engine and middlewares
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

PORT = process.env.PORT || 8080;
//Connecting to our Database and accessing a PORT
mongoose.connect(process.env.DB_KEY, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((result)=> app.listen(PORT, console.log(`Connected to DB Server running on http://localhost:${PORT}`)))
    .catch((err)=>console.log(err))

// routes
app.get('*', checkUser);
app.get('/', (req,res)=>{
    res.redirect('/login')
    // res.render('./blog/index', {title:'Home Page'});
});

app.get('/about', (req,res)=>{
    res.render('about', {title:'About'});
});

app.use(authRouter);

app.use(blogRoutes);