const mongoose = require('mongoose')

userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    userPassword: {
        type: String,
        required: true,
        
    },
    userImg: {
        type: String,
        required: false,
        default: null,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },

    userSecretKey: {
        type: String,
        required: false,
        default: null,
    },

    sessionExpiry: {
        type: Number,
        required: false,
        default: 3600000,
    },


})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel