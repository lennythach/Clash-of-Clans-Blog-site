const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');

const userSchema = Schema({
    email:{
        type:String,
        required:[true, 'Please enter email'],
        unique: true,
        lowercase:true,
        validate: [isEmail, 'Not a valid email. Please try again.']
    },
    password:{
        type:String,
        required:[true, 'Please enter password'],
        minlength: [6, 'Minimum password length must be 6 character long']
    }
    
}, {timestamps: true});

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
    console.log('new user was created & saved', doc);
    next();
});

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt= await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


// static method to log in user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password')
    } 
    throw Error('Incorrect Email')
};

const User = new mongoose.model('User', userSchema);

module.exports = User;