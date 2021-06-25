const accountCollection = require('../models/accountModel')
const userCollection = require('../models/userModel')
const bcrypt = require('bcrypt')
const  {decryptPassword} = require('../middleware/projectModules/cryptoEncryption')



function socketServer(socketServerChannel) {

    socketServerChannel.on('connection', (socket) => {
        console.log('Socket ID: ', socket.id);

        socket.on('secretKey', async (accountIDandSecretKey) => {
            
            providedSecretKey = accountIDandSecretKey.secretKey
            accountID = accountIDandSecretKey.accountID
            userID = accountIDandSecretKey.userID

            let userFound = await userCollection.find({
                _id: userID
            })

            bcrypt.compare(providedSecretKey, userFound[0].userSecretKey, async function (error, secretKeyMatches) {
                if (error) {
                    console.log(error);
                }
                else if (secretKeyMatches) {
                    let accountFound = await accountCollection.find({
                        _id: accountID
                    })
                    let decryptedAccountPassword = decryptPassword(accountFound[0].accountPassword)
                    console.log('decryptedAccountPassword', decryptedAccountPassword);
                    socket.emit('decryptedAccountPassword', decryptedAccountPassword)


                } else {
                    console.log('Wrong Secret Key');


                }
            })


        })

    })
}


module.exports = socketServer

