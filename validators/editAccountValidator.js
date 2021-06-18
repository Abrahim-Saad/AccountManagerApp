const { check } = require('express-validator')


module.exports = [
    
    check('accountNameToEdit').isLength({ min: 3 }).withMessage("Name can't be less than 3 letters!!"),
    check('accountEmailToEdit').isEmail().withMessage("Please enter a valid Email!!"),
    check('accountNewPassword').isLength({ min: 3 }).withMessage("Password can't be less than 8 charchters!!"),
    check('confirmNewPassword').custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.accountNewPassword) { 
            return false }
        else { return true }
    }),
]
