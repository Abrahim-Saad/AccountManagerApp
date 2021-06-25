const { check } = require('express-validator')


module.exports.resetPassword = [
    
    check('userEmail').isEmail().withMessage("Please enter a valid Email!!"),
    check('newUserPassword').isLength({ min: 3 }).withMessage("Password can't be less than 8 charchters!!"),
    check('confirmNewUserPassword').custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.newUserPassword) { 
            return false }
        else { return true }
    }),
]

module.exports.resetSecretKey = [
    
    check('userEmail').isEmail().withMessage("Please enter a valid Email!!"),
    check('newUserSecretKey').isLength({ min: 3 }).withMessage("Password can't be less than 8 charchters!!"),
    check('confirmNewUserSecretKey').custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.newUserSecretKey) { 
            return false }
        else { return true }
    }),
]
