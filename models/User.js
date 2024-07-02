
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "please provide a valide name"],
        minlength: 3,
        maxlength: 40
    }
    ,email: {
        type: String,
        require: [true, "please provide a valide email"],
        minlength: 3,
        maxlength: 40,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please provide a valid email"],
        unique: true
    }
    ,password: {
        type: String,
        require: [true, "please provide a valide password"],
        minlength: 3,
    }
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET, {expiresIn:process.env.JWT_VALIDATE})
}

UserSchema.methods.comparePasswords = async function(passwordEnterd) {
    const passwordComparing = await bcrypt.compare(passwordEnterd, this.password)
    return passwordComparing
}

module.exports = mongoose.model("User",UserSchema)