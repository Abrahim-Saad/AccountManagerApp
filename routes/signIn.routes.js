const app = require('express').Router();
const signinFormInputValidator = require('../validators/signinFormValidator')
// const signinAuthenticator = require('../Middleware/signinAuthenticator')

const signInController = require('../controllers/signInController');
const { response } = require('express');

app.get('/activateAccount/:token', signInController.activateAccount)


app.get('/signin', signInController.signIn)


app.get('/forgotPassword', signInController.forgotPassword)


app.post('/login', signinFormInputValidator, signInController.logIn)




module.exports = app