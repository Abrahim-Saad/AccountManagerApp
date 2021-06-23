const express = require('express');
const app = require('express').Router();
const path = require('path');
const session = require('express-session')
const multer = require('multer');


const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb+srv://admin:admin@accountmanagerappdb.7lw5y.mongodb.net/accountManagerAppDB',
  // uri: 'mongodb://localhost:27017/accountManagerDB',
  collection: 'mySessions'
});


let imgeStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'middleware/public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.random() * 100 + file.originalname)
  }
})

function imgeFilter(req, imgeFile, cb) {
  if (imgeFile.mimetype == 'image/jpg' || imgeFile.mimetype == 'image/png' || imgeFile.mimetype == 'image/jpeg') {
    console.log(imgeFile.mimetype);
    cb(null, true)

  } else {
    console.log(imgeFile.mimetype);
    cb(null, false)

  }



}


let fileUpload = multer({ dest: 'middleware/public', storage: imgeStore, fileFilter: imgeFilter })
app.use(fileUpload.single('accountImgeToEdit'))
// app.use(fileUpload.fields([
//   { name: 'accountImgeToEdit' },
//   // { name: 'accountImge' },
// ]))



// app.use(flash())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))





app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(require('../routes/signUp.routes'))
app.use(require('../routes/signIn.routes'))
app.use(require('../routes/signOut.routes'))
app.use(require('../routes/homePage.routes'))
app.use(require('../routes/crudOperations.routes'))
app.use(require('../routes/securityConfig.routes'))
app.use(require('../routes/bugReport.routes'))
app.use(require('../routes/settingsConfig.routes'))
app.use(require('../routes/sendEmails.routes'))
app.use(require('../routes/resetPassword.routes'))




app.get('*', (request, response) => {
  response.send("404 Page Not Found!!")
})

module.exports = app