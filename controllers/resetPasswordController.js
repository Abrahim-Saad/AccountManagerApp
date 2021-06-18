const userCollection = require('../models/userModel')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')


module.exports.resetPassword = (request, response) => {
    console.log(request.protocol + ":/" + request.get('host'));
    if ((request.protocol + "://" + request.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (request.query.id == randomVerficationCode) {
            console.log("email is verified");
            response.render('resetPasswordPage', {
                oldInputs: { userEmail: '' },
                emailExists: true, invalidEmail: false,
                isLoggedIn: false, profileName: '',
            })
        }
        else {
            console.log("email is not verified");
            response.redirect('/signup')
        }
    } else {
        response.redirect('/signup')

    }
}



module.exports.storeResetPassword = async (request, response) => {
    try {
        const { userEmail, newUserPassword } = request.body
        const userInputErrors = validationResult(request)
        let userInfo = await userCollection.findOne({ userEmail: userEmail })
        if (userInfo.userEmail != null) {
            if (userInputErrors.isEmpty()) {

                bcrypt.hash(newUserPassword, 5, async function (err, hashedPassword) {
                    // Store hash in your password DB.
                    // console.log("1)" + userInfo);

                    await userCollection.findOneAndUpdate({ userEmail: userEmail },
                        {
                            userPassword: hashedPassword,
                        });

                    response.redirect('/signin')

                });

            }
            else {
                console.log(userInputErrors.array());
                response.render('resetPasswordPage', {
                    oldInputs: { userEmail: userEmail },
                    emailExists: true, isLoggedIn: false
                })
            }


        }
        else {
            console.log("Email Doesn't Exist!!");
            response.render('signupPage', {
                oldInputs: { userName: '', userEmail: '', userPassword: '' },
                emailExists: false, isLoggedIn: false, profileName: ''
            })
        }


    } catch (error) {
        console.log(error);
        response.redirect('/signin')
    }

}

