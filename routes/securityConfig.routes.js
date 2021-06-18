const app = require('express').Router();
const bugReportController = require('../controllers/bugReportController')


app.get('/security', bugReportController.bugReport)






module.exports = app