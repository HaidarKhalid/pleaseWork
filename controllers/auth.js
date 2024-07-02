
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req,res)=> {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).send({user:{name:user.name}, token})
}

const login = async (req,res)=> {
    const {email,password} = req.body
    if (!email||!password) {
        throw new BadRequestError('please provide all informations')
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new UnauthenticatedError("Invalid information")
    }
    const passwordComparingResult = await user.comparePasswords(password)
    if (!passwordComparingResult) {
        throw new UnauthenticatedError("Invalid information")
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).send({user: {name: user.name}, token})
}

module.exports = {register,login}