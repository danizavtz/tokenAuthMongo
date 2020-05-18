const { body, param, validationResult } = require('express-validator');


exports.validationBodyRules = [    
    body('name', 'name is required').exists(),
    body('login', 'login is required').exists(),
    body('password', 'password is required').exists(),
    body('name', 'name is required').notEmpty(),
    body('login', 'login is required').notEmpty(),
    body('password', 'password is required').notEmpty()
];

exports.validationPutRules = [
    param('id', 'id is required').exists(),
    param('id', 'id must be an hexadecimal (0 to F) with 24 positions').isLength({ min: 24, max: 24 }),
    body('name', 'name is required').exists(),
    body('name', 'name is required').notEmpty()
]

exports.checkRules = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}