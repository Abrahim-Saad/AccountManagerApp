// const accountCollection = require('../models/accountModel')


module.exports.securityPage = async (request, response) => {
    try{
        response.render('securityPage', {
            isLoggedIn: request.session.isLoggedIn,
            profileName: request.session.userName,
            
        })
    }catch(error){
        console.log(error);
    }
}
