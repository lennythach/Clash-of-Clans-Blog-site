const User = require('../models/User');

//hanlde errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email:'', password:''};

    //duplicated error code
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
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

module.exports.register_get = (req,res)=>{
    res.render('register', {title:'Register'})
}

module.exports.register_post = async (req,res)=>{
    const {name,email,password} = req.body
    try {
        const user = await User.create({name, email, password});
        res.status(201).json(user);

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.login_get = (req, res)=> {
    res.render('login', {title:'Login'})
}

module.exports.login_post = (req, res)=> {
    res.send('login', {title:'Login'})
}