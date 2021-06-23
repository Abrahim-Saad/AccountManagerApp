const app = require('express').Router();
const securityController = require('../controllers/securityController')
const secretKeyValidator = require('../validators/secretKeyValidator')

app.get('/security', securityController.securityPage)


app.post('/editExpiryDate', securityController.editExpiryDate)


app.post('/addSecretKey', secretKeyValidator.validateKey, securityController.addSecretKey)


app.post('/editSecretKey', secretKeyValidator.validateNewKey, securityController.editSecretKey)


app.post('/deleteSecretKey', securityController.deleteSecretKey)








module.exports = app