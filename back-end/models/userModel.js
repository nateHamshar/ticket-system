const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const validator = require("validator")


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    companyCode: {
        type: String,
        required: true
    }
})
//static signup method

userSchema.statics.signup = async function(email, password, firstName, lastName, companyCode) {
    

    if (!email || !password) {
        throw Error("All fields are required")
    }
    if (!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }

    const exists = await this.findOne({ email });
    
    if (exists) {
        throw Error("email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, firstName, lastName, companyCode})

    return user
}

// static login method

userSchema.statics.login = async function(email, password) {
    
    if (!email || !password) {
        throw Error("All fields are required")
    }

    const user = await this.findOne({ email });
    
    if (!user) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Invalid login credentials")
    }

    return user
}


module.exports = mongoose.model('User', userSchema)