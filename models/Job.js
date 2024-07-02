const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema({
    company: {
        type: String,
        require: [true, 'please provide company name'],
        maxlength: 50
    },status: {
        type: String,
        enum: ['interview','declined','pending'],
        default: 'pending'

    },position: {
        type: String,
        require: [true, 'please provide position'],
        maxlength: 150
    },createdBy: {
        type:mongoose.Types.ObjectId,
        ref: "User",
        require: [true, 'please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('Job',jobsSchema)