const app = require('express').Router();
const resetPasswordController = require('../controllers/resetPasswordController')
const resetPasswordValidator = require('../validators/resetPasswordValidator')



app.get('/resetPassword', resetPasswordController.resetPassword)

app.post('/storeResetPassword', resetPasswordValidator,resetPasswordController.storeResetPassword)


module.exports = app