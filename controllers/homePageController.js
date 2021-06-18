const accountCollection = require('../models/accountModel')


module.exports.homePage = async (request, response) => {
    try{
        // let userAccounts = await accountCollection.find({}).populate('userId', 'userName')
        let userAccounts = await accountCollection.find({ userID: request.session.userID });
        // console.log(userAccounts);
        response.render('homePage', {
            isLoggedIn: request.session.isLoggedIn,
            profileName: request.session.userName,
            userAccountsArray: userAccounts
        })
    }catch(error){
        console.log(error);
    }
}
