const express = require('express');

const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');
// require('dotenv').config();

const app = express();

// Register our view engine and middlewares
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cookieParser());

//Connecting to our Database and accessing a PORT
const PORT =  process.env.PORT || 8000;
const dbURI = "mongodb+srv://lennythach:bboy4life253@firstdb.edjdx.mongodb.net/HeroDB?retryWrites=true&w=majority"
// const dbURI = process.env.DB_KEY;
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((result)=> app.listen(PORT, console.log(`Connected to DB Server running on http://localhost:${PORT}`)))
    .catch((err)=>console.log(err))

app.get('/', (req,res)=>{
    res.redirect('/blogs')
    // res.render('./blog/index', {title:'Home Page'});
});

app.get('/about', (req,res)=>{
    res.render('about', {title:'About'});
});

app.use(authRouter);

app.use(blogRoutes);