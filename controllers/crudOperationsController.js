const accountCollection = require('../models/accountModel')
const { validationResult } = require('express-validator')
const { encryptPassword, decryptPassword } = require('../middleware/projectModules/cryptoEncryption')
const bcrypt = require('bcrypt')


module.exports.addAccount = async (request, response) => {

    try {

        const { accountName, accountEmail, accountPassword } = request.body;
        const userInputErrors = validationResult(request)

        if (userInputErrors.isEmpty()) {
            accountHashedPassword = encryptPassword(accountPassword)
            console.log("accountHashedPassword: ", accountHashedPassword);
            await accountCollection.insertMany(
                {
                    accountName: accountName,
                    accountEmail: accountEmail,
                    accountPassword: accountHashedPassword,
                    userID: request.session.userID,
                });
            console.log("Success!!")
            response.redirect('/home')
        
        }
        else {
            console.log(userInputErrors.array());
            response.redirect('/home')

        }

    } catch (error) {
        console.log(error)
        response.redirect('/home')
    }


}


module.exports.deleteAccount = async (request, response) => {
    // const { noteTitle, noteContent } = request.body
    try {
        console.log(request.body);
        await accountCollection.findByIdAndDelete({ _id: request.body.accountIDtoDelete });
        response.redirect('/home')

    } catch (error) {
        console.log(error);
        response.redirect('/home')
    }

}


module.exports.editAccountInfo = async (request, response) => {
    try {
        const {
            accountIDtoEdit, accountNameToEdit, accountEmailToEdit,
            accountOldPassword, accountNewPassword, confirmNewPassword } = request.body

        console.log(request.body);

        if (accountOldPassword == '' && accountNewPassword == '' && confirmNewPassword == '') {
            await accountCollection.findByIdAndUpdate({ _id: accountIDtoEdit },
                { accountName: accountNameToEdit, accountEmail: accountEmailToEdit });
            response.redirect('/home')


        } else if (accountOldPassword != '' && accountNewPassword != '' && confirmNewPassword != '') {
            let userAccountToEdit = await accountCollection.find({ _id: accountIDtoEdit });
            // console.log(userAccountToEdit);
            let decryptedOldPassword = decryptPassword(userAccountToEdit[0].accountPassword)
            // console.log("decryptedOldPassword: ", decryptedOldPassword);
            if (decryptedOldPassword == accountOldPassword) {
                console.log("Password Matches");
                newHashedPassword = encryptPassword(accountNewPassword)
                console.log('newHashedPassword: ', newHashedPassword);
                await accountCollection.findByIdAndUpdate({ _id: accountIDtoEdit },
                    {
                        accountName: accountNameToEdit,
                        accountEmail: accountEmailToEdit,
                        accountPassword: newHashedPassword,
                    });

                response.redirect('/home')
            }
            
        }

    } catch (error) {
        console.log(error);
        response.redirect('/home')
    }

}


module.exports.editAccountImg = async (request, response) => {
    try {
        const { accIDtoEditImge } = request.body
        if (request.file == undefined) {
            console.log("Unsupported File Type");
            console.log(request.file);
            response.redirect('/home')
        } else {
            await accountCollection.findByIdAndUpdate({ _id: accIDtoEditImge },
                {
                    accountImge: request.file.path,
                });

            // console.log(request.file);
            response.redirect('/home')
        }


    } catch (error) {
        console.log(error);
        response.redirect('/home')
    }

}

