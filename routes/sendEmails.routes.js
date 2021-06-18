const app = require('express').Router();
const sendEmailsController = require('../controllers/sendEmailsController')





app.post('/sendEmailToResetPassword', sendEmailsController.sendEmailToResetPassword)


app.post('/sendBugReport', sendEmailsController.sendBugReport)




module.exports = app