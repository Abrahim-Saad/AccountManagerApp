// let jsonWebToken = require('jsonwebtoken')


module.exports = (request, response, next) => {
    if (request.session.userID) {
        
        next()
    } else {
        response.redirect('/signin')
    }
}
