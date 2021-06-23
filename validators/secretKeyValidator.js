const { check } = require('express-validator')


module.exports.validateKey = [
    
    check('secretKey').isLength({ min: 3 }).withMessage("Password can't be less than 8 charchters!!"),
    check('confirmsecretKey').custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.secretKey) { 
            return false }
        else { return true }
    }),
]


module.exports.validateNewKey = [
    
    check('newSecretKey').isLength({ min: 3 }).withMessage("Password can't be less than 8 charchters!!"),
    check('confirmNewSecretKey').custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.newSecretKey) { 
            return false }
        else { return true }
    }),
]
