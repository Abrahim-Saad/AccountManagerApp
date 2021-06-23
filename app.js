const express = require('express');
const app = express();
const localPort = 3000;
const availablePort = process.env.PORT
const mongoose = require('mongoose')
const appModules = require('./middleware/appModules')

app.set("view engine", "ejs")

app.use(appModules)


mongoose.connect('mongodb+srv://admin:admin@accountmanagerappdb.7lw5y.mongodb.net/accountManagerAppDB', { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect('mongodb://localhost:27017/accountManagerDB', { useNewUrlParser: true, useUnifiedTopology: true })


app.listen(availablePort || localPort, () => console.log("The Server is Up and Running!!"))




