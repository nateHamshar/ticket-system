const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: "3d"})
}
//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password)
        const firstName = user.firstName;
        const companyCode = user.companyCode;
        const token = createToken(user._id)
        res.status(200).json({firstName, token, companyCode})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//singup user

const signupUser = async (req, res) => {

    const {email, password, firstName, lastName, companyCode} = req.body;
    console.log(email, password, firstName, lastName, companyCode)
    try {
        const user = await User.signup(email, password, firstName, lastName, companyCode)

        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}