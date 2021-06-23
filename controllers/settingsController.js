const userCollection = require('../models/userModel')
const accountCollection = require('../models/accountModel')
const jsonWebToken = require('jsonwebtoken')
const mongoose = require('mongoose')



module.exports.settingsConfig = async (request, response) => {
    try {
        // userImg = await userCollection.findById(request.session.id)
        response.render('settingsPage', {
            isLoggedIn: request.session.isLoggedIn,
            userID: request.session.userID,
            profileName: request.session.userName,
            userEmail: request.session.userEmail,
            userImg: '',

        })
    } catch (error) {
        console.log(error);
    }
}


module.exports.deleteUser = async (request, response) => {
    console.log("delete user success");
    let userToken = request.params.token
    console.log(userToken);
    jsonWebToken.verify(userToken, "userToken", async (error, decodedToken) => {
        if (error) {
            console.log(decodedToken);
            response.json({ "Error 1)": error })
        } else {
            request.emailToDelete = decodedToken.userEmail
            console.log(decodedToken.userEmail);
            // userID = mongoose.Types.ObjectId(request.userID)
            await accountCollection.findOneAndDelete({ userID: request.session.userID });

            await userCollection.findOneAndDelete({ userEmail: request.emailToDelete });


        }
        // console.log(userAccount.isActivated);

    })



    response.redirect('/signup')

}





module.exports.editUserName = async (request, response) => {
    const { useIDtoEditName, accountNameToEdit } = request.body
    await userCollection.findOneAndUpdate({ _id: useIDtoEditName },
        {
            userName: accountNameToEdit,
        });
    response.redirect('/signout')

}



module.exports.changeUserEmail = async (request, response) => {
    console.log("Changed Successfully!");
    let userToken = request.params.token
    console.log(userToken);
    jsonWebToken.verify(userToken, "userToken", async (error, decodedToken) => {
        if (error) {
            console.log(decodedToken);
            response.json({ "Error 1)": error })
        } else {
            request.userNewEmail = decodedToken.userEmail
            console.log(decodedToken.userNewEmail);
            // userID = mongoose.Types.ObjectId(request.userID)
            await userCollection.findOneAndUpdate({ userEmail: request.session.userEmail },
                {
                    userEmail: request.userNewEmail 
                });
            response.redirect('/signin')


        }
        // console.log(userAccount.isActivated);

    })



    response.redirect('/signup')

}



module.exports.changePassword = (request, response) => {
    response.render('forgotPasswordPage', {
        oldInputs: { userEmail: ""},
        emailExists: true, invalidEmail: false,
        isLoggedIn: false, profileName: '',
        forgotPassword: false,
    })

}