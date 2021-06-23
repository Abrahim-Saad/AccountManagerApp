
const userCollection = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports.securityPage = async (request, response) => {
    try {
        // let expiryDate = 3600000 //hour
        // request.session.cookie.expires = new Date(Date.now() + expiryDate)
        // request.session.cookie.maxAge = expiryDate
        // expiry = request.session.cookie.expires
        let isSecretKey = false
        expiryDate = [parseInt(request.session.expiryDate) / (1000 * 60)]
        if (request.session.userID == undefined) {
            response.redirect('/signout')
        }

        response.render('securityPage', {
            isLoggedIn: request.session.isLoggedIn,
            userID: request.session.userID,
            profileName: request.session.userName,
            userEmail: request.session.userEmail,
            secretKey: request.session.secretKey,
            expiryDate: expiryDate

        })
    } catch (error) {
        console.log(error);
    }
}



module.exports.addSecretKey = async (request, response) => {
    console.log(request.body.secretKey);
    bcrypt.hash(request.body.secretKey, 5, async function (err, hashedSecretKey) {
        await userCollection.findByIdAndUpdate({ _id: request.session.userID },
            {
                userSecretKey: hashedSecretKey
            })

        response.redirect('/signout')
    }
    )
}



module.exports.editSecretKey = async (request, response) => {
    console.log(request.body);
    const { oldSecretKey, newSecretKey } = request.body
    // let userToEdit = await userCollection.find({ _id: request.session.userID });
    // console.log(userToEdit);
    bcrypt.compare(oldSecretKey, request.session.secretKey, function (error, secretKeyMatches) {
        if (error) {
            console.log(error);
        }
        else if (secretKeyMatches) {
            console.log("secretKeyMatches Matches");
            bcrypt.hash(newSecretKey, 5, async function (err, hashedSecretKey) {
                await userCollection.findByIdAndUpdate({ _id: request.session.userID },
                    {
                        userSecretKey: hashedSecretKey,
                    });

                response.redirect('/security')
            })

            // response.redirect('/home')
        } else {
            console.log('Wrong Password');
            response.redirect('/security')


        }
    })
}




module.exports.deleteSecretKey = async (request, response) => {
    console.log(request.body);
    const { secretKey } = request.body
    // let userToEdit = await userCollection.find({ _id: request.session.userID });
    // console.log(userToEdit);
    bcrypt.compare(secretKey, request.session.secretKey, async function (error, secretKeyMatches) {
        if (error) {
            console.log(error);
        }
        else if (secretKeyMatches) {
            console.log("secretKeyMatches Matches");
            await userCollection.findByIdAndUpdate({ _id: request.session.userID },
                {
                    userSecretKey: null,
                });

            response.redirect('/signout')

            // response.redirect('/home')
        } else {
            console.log('Wrong Password');
            response.redirect('/home')


        }
    })
}





module.exports.editExpiryDate = async (request, response) => {
    let newExpiryDate = request.body.newExpiryDate
    newExpiryDate = newExpiryDate * 1000 * 60
    await userCollection.findByIdAndUpdate({ _id: request.session.userID },
        {
            sessionExpiry: newExpiryDate
        })

    response.redirect('/signout')
}

