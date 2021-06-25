const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

accountSchema = mongoose.Schema({

    accountName: {
        type: String,
        required: true,
        
    },
    
    accountEmail: {
        type: String,
        required: true,
        unique: false,
        lowercase: true,
    },

    accountPassword: {
        type: Object,
        required: true,
        
    },

    accountImge: {
        type: String,
        required: false,
    },

    userID: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
})

const accountModel = mongoose.model('account', accountSchema)

module.exports = accountModel