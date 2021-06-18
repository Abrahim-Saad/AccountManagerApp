const app = require('express').Router();
const settingsController = require('../controllers/settingsController')


app.get('/settings', settingsController.settingsConfig)






module.exports = app