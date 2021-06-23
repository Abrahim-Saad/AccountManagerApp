const userCollection = require('../models/userModel')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const nodeMailer = require("nodemailer");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
const jsonWebToken = require('jsonwebtoken')


// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nelin39254@gmail.com', // generated ethereal user
        pass: '01276256028aa', // generated ethereal password
    },
});

module.exports.signUp = (request, response) => {
    try {
        response.render('signupPage'
        ,{
                oldInputs: { userName: "", userEmail: "", userPassword: "" },
                emailExists: false, invalidEmail: false, isLoggedIn: false, profileName: ''
        }
            )

    } catch (error) {
        console.log(error);
        response.redirect('/signup')
    }



}


module.exports.addNewAccount = async (request, response) => {
    try {
        const { userName, userEmail, userPassword } = request.body;
        const userInputErrors = validationResult(request)
        let usedEmail = await userCollection.findOne({ userEmail: userEmail })
        if (usedEmail == null) {
            if (userInputErrors.isEmpty()) {
                bcrypt.hash(userPassword, 5, async function (err, hashedPassword) {
                    // Store hash in your password DB.
                    await userCollection.insertMany(
                        {
                            userName: userName,
                            userEmail: userEmail,
                            userPassword: hashedPassword
                        });
        

                    let urlToken = jsonWebToken.sign({ userEmail: userEmail}, 'userToken')


                    // randomVerficationCode = Math.floor((Math.random() * 100) + 54);
                    host = request.get('host');
                    verificationLink = "http://" + request.get('host') + "/activateAccount/" + urlToken;
                    // console.log(urlToken);
                    let emailOptions = {
                        from: '"Password Manager" <nelin39254@gmail.com>', // sender address
                        to: request.body.userEmail, // list of receivers
                        subject: "Activate Account!", // Subject line
                        html: `<div>
                                <div >
                                    <div>
                                        <h2> You have just created a new Account Manger!</h2><br>
                                        <div>
                                            Please Click on the link to Activate your Account.<br><a href="${verificationLink}">Click here to Activate your Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`, // html body
                    }

                    await transporter.sendMail(emailOptions, (error) => {
                        if (error) {
                            console.log('You Have an Error: =>', error);
                        } else {
                            console.log("Email Has Been Sent");
                            response.render('emailVerficationPage', {
                                isLoggedIn: false, profileName: '',
                            })

                        }

                    });

                    // console.log(request.body.userEmail);
                   

                });


            }
            else {
                console.log(userInputErrors.array());
                response.render('signupPage', {
                    oldInputs: { userName: userName, userEmail: userEmail, userPassword: userPassword },
                    emailExists: false, isLoggedIn: false, profileName: ''
                })
            }


        }
        else {
            console.log("Email already Exists!!");
            response.render('signupPage', {
                oldInputs: { userName: userName, userEmail: userEmail, userPassword: userPassword },
                emailExists: true, isLoggedIn: false, profileName: ''
            })
        }
    } catch (error) {
        console.log(error);
        response.redirect('/signup')
    }

    // console.log(usedEmail);


}


