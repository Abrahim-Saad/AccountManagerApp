const app = require('express').Router();
const crudOperationsController = require('../controllers/crudOperationsController')
const accountValidator = require('../validators/accountValidator')
const editAccountValidator = require('../validators/editAccountValidator')

app.post('/addAccount', accountValidator, crudOperationsController.addAccount)

app.post('/deleteAccount', crudOperationsController.deleteAccount)

app.post('/editAccountInfo', editAccountValidator, crudOperationsController.editAccountInfo)

app.post('/editAccountImg', crudOperationsController.editAccountImg)





module.exports = app