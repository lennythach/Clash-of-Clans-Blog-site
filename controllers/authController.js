const User = require('../models/User');
const jwt = require('jsonwebtoken');

//hanlde errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email:'', password:''};

    //Incorrect email
    if (err.message === 'Incorrect Email') {
        errors.email = 'That email is not registered';
    }

    if (err.message === 'Incorrect Password') {
        errors.password = 'That password is incorrect';
    }

    //duplicated error code
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        console.log(errors.name)
        return errors;
    }

    //validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors
}

//Creating JSON Web Token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=> {
    return jwt.sign({ id }, 'Super Duper Hero Blog', {
        expiresIn:maxAge
    });
}

module.exports.register_get = (req,res)=>{
    res.render('./auth/register', {title:'Register'})
}

module.exports.register_post = async (req,res)=>{
    const {name,email,password} = req.body
    try {
        const user = await User.create({ email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge:maxAge * 1000 });
        res.status(201).json({ user: user._id });

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.login_get = (req, res)=> {
    res.render('./auth/login', {title:'Login'})
}

module.exports.login_post = async (req, res)=> {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge:maxAge * 1000 });
        res.status(200).json( { user:user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}