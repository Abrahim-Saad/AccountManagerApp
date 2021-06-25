const app = require('express').Router();
const settingsController = require('../controllers/settingsController')


app.get('/settings', settingsController.settingsConfig)



app.get('/deleteUser/:token', settingsController.deleteUser)


app.get('/changeUserEmail/:token', settingsController.changeUserEmail)


app.get('/changePassword', settingsController.changePassword)


app.post('/editUserName', settingsController.editUserName)


app.post('/editUserImg', settingsController.editUserImg)








module.exports = app