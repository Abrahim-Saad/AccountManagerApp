const userCollection = require('../models/userModel')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')




module.exports.signIn = (request, response) => {
    try {
        if (request.session.userID) {
            response.redirect('/home')
        } else {
            response.render('signinPage.ejs', {
                oldInputs: { userEmail: "", userPassword: "" },
                emailExists: true, passwordCorrect: true, invalidEmail: false,
                isLoggedIn: false, profileName: '',
            })
        }
    } catch (error) {
        console.log(error);
        response.redirect('/signin')
    }



}


module.exports.activateAccount = async (request, response) => {

    let userToken = request.params.token
    console.log(userToken);
    jsonWebToken.verify(userToken, "userToken", async (error, decodedToken) => {
        if (error) {
            console.log(decodedToken);
            response.json({ "Error 1)": error })
        } else {
            request.userEmail = decodedToken.userEmail
            console.log(decodedToken.userEmail);
            userAccount = await userCollection.findOneAndUpdate({ userEmail: decodedToken.userEmail },
                {
                    isActivated: true,
                });

        }
        // console.log(userAccount.isActivated);

    })


    response.redirect('/signin')


}



module.exports.forgotPassword = async (request, response) => {

    console.log(request.params);

    response.render('forgotPasswordPage', {
        oldInputs: { userEmail: ""},
        emailExists: true, invalidEmail: false,
        isLoggedIn: false, profileName: '',
    })

}


module.exports.logIn = async (request, response) => {
    try {
        const { userEmail, userPassword } = request.body
        // console.log(emailForm);
        const userInputErrors = validationResult(request)
        if (userInputErrors.isEmpty()) {
            let userFound = await userCollection.findOne({ userEmail: userEmail })
            // console.log(userFound);
            if (userFound != null && userFound.isActivated == true) {
                bcrypt.compare(userPassword, userFound.userPassword, function (error, passwordMatches) {
                    if (error) {
                        console.log(error);
                    }
                    else if (passwordMatches) {
                        let hour = 3600000
                        request.session.cookie.expires = new Date(Date.now() + hour)
                        request.session.cookie.maxAge = hour
                        request.session.userID = userFound._id
                        request.session.userName = userFound.userName
                        request.session.userEmail = userFound.userEmail
                        // response.render('homePage', { name: request.session.userName })
                        response.redirect('/home')
                    } else {
                        console.log('Wrong Password');
                        response.render('signinPage.ejs', {
                            oldInputs: { userEmail: userEmail, },
                            emailExists: true, passwordCorrect: false, invalidEmail: false,
                            isLoggedIn: false, profileName: ''
                        })

                    }
                })

            } else if (userFound.isActivated == false) {
                console.log("Please Activate Your Account First!");
                response.render('emailVerficationPage', {
                    emailExists: true, invalidEmail: false,
                    isLoggedIn: false, profileName: '',
                })

            } else {
                console.log("Email doesn't exist");
                response.render('signinPage.ejs', {
                    oldInputs: { userEmail: userEmail, userPassword: userPassword },
                    emailExists: false, passwordCorrect: true, invalidEmail: false,
                    isLoggedIn: false, profileName: ''
                })
            }
        } else {
            console.log(userInputErrors.array());
            response.render('signinPage.ejs', {
                oldInputs: { userEmail: userEmail, userPassword: userPassword },
                emailExists: true, passwordCorrect: true, invalidEmail: true,
                isLoggedIn: false, profileName: ''
            })
        }
        // console.log(userFound);
    } catch (error) {
        console.log(error);
        response.redirect('/signin')
    }


}