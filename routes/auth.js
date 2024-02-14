const controller = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const validator = require('express-validator');
const helpers = require('../helpers/auth');

/**
 * @swagger
 * components:
 *      schemas:
 *       UserRegisterDto:
 *        type: object
 *        properties:
 *          username:
 *           type: string
 *          email:
 *           type: string
 *          password:
 *           type: string
 *          passwordConfirm:
 *           type: string
 *       UserLoginDto:
 *        type: object
 *        properties:
 *         email:
 *          type: string
 *         password:
 *          type: string
 */ 

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     description: Register a new user
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/UserRegisterDto'
 *      schema:
 *     responses:
 *       201:
 *         description: Successful operation
 */
router.post('/register', 
    [
        validator.body('username')
            .isLength({ min: 3 })
            .withMessage('username must be at least 3 characters long')
            .custom(helpers.usernameExists),

        validator.body('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom(helpers.emailExists),

        validator.body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .custom((value, {req}) => {
                if (req.body.password !== req.body.passwordConfirm) {
                    throw new Error('Passwords do not match');
                } else {
                    return true;
                }
            })
    ],
    controller.createUser
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     description: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/UserLoginDto'
 *      schema:
 *     responses:
 *       201:
 *         description: Successful operation
 */
router.post('/login', controller.login);

module.exports = router;    
