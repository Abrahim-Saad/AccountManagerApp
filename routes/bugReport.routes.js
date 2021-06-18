const app = require('express').Router();

const bugReportController = require('../controllers/bugReportController')


app.get('/reportBug', bugReportController.reportBug)




module.exports = app