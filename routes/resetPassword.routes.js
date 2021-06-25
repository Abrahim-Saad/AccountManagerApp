const app = require('express').Router();
const resetPasswordController = require('../controllers/resetPasswordController')
const resetPasswordValidator = require('../validators/resetPasswordValidator')



app.get('/resetPassword', resetPasswordController.resetPassword)

app.get('/resetSecretKey', resetPasswordController.resetSecretKey)


app.post('/storeResetPassword', resetPasswordValidator.resetPassword, resetPasswordController.storeResetPassword)

app.post('/storeResetSecretKey', resetPasswordValidator.resetSecretKey, resetPasswordController.storeResetSecretKey)



module.exports = app