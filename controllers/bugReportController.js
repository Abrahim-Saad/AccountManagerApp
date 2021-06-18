
module.exports.reportBug = async (request, response) => {
    try{
        response.render('bugReportPage', {
            oldInputs: {},
            isLoggedIn: request.session.isLoggedIn,
            profileName: request.session.userName,
            showAlert: false
            
        })
    }catch(error){
        console.log(error);
    }
}