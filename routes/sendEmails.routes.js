const app = require('express').Router();
const sendEmailsController = require('../controllers/sendEmailsController')





app.post('/sendEmailToResetPassword', sendEmailsController.sendEmailToResetPassword)


app.post('/sendBugReport', sendEmailsController.sendBugReport)


app.post('/sendEmailToDeleteUser', sendEmailsController.sendEmailToDeleteUser)


app.post('/sendEmailToChangeUserEmail', sendEmailsController.sendEmailToChangeUserEmail)





module.exports = app