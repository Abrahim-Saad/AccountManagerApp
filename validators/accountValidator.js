const { check } = require('express-validator')


module.exports = [
    
    check('accountName').isLength({ min: 3 }).withMessage("Name can't be less than 3 letters!!"),
    check('accountEmail').isEmail().withMessage("Please Enter a valid Email!!"),
    check('accountPassword').isLength({ min: 3 }).withMessage("Password can't be less than 8 charchters!!"),
    check('confirmPassword').custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.accountPassword) { 
            return false }
        else { return true }
    }),
]
