const userCollection = require('../models/userModel')
const accountCollection = require('../models/accountModel')
const jsonWebToken = require('jsonwebtoken')



module.exports.settingsConfig = async (request, response) => {
    try {
        // userImg = await userCollection.findById(request.session.id)
        console.log(request.session.userImg);
        response.render('settingsPage', {
            isLoggedIn: request.session.isLoggedIn,
            userID: request.session.userID,
            profileName: request.session.userName,
            userEmail: request.session.userEmail,
            userImg: request.session.userImg,

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


module.exports.editUserImg = async (request, response) => {
    try {
        if (request.file == undefined) {
            console.log("Unsupported File Type");
            console.log(request.file);
            response.redirect('/settings')
        } else {
            await userCollection.findByIdAndUpdate({ _id: request.session.userID },
                {
                    userImg: request.file.path,
                });

            // console.log(request.file);
            console.log('Img Uploaded Successfully');

            response.render('settingsPage', {
                isLoggedIn: request.session.isLoggedIn,
                userID: request.session.userID,
                profileName: request.session.userName,
                userEmail: request.session.userEmail,
                userImg: request.file.path,

            })
        }


    } catch (error) {
        console.log(error);
        response.redirect('/settings')
    }

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
        oldInputs: { userEmail: "" },
        emailExists: true, invalidEmail: false,
        isLoggedIn: false, profileName: '',
        forgotPassword: false,
    })

}