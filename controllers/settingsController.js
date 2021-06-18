module.exports.settingsConfig = async (request, response) => {
    try{
        response.render('settingsPage', {
            isLoggedIn: request.session.isLoggedIn,
            profileName: request.session.userName,
            
        })
    }catch(error){
        console.log(error);
    }
}