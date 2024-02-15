const controller = require('../controllers/users');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isAuth = require('../middleware/isAuth');
const validator = require('express-validator');

/**
 * @swagger
 * /users/me:
 *  get:
 *   tags: [Users]
 *   description: Get the current user
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Successful operation
 *    401:
 *     description: Unauthorized
 */
router.get('/me', isAuth, controller.getMe);

/**
 * @swagger
 * /users/updateMe:
 *  put:
 *   tags: [Users]
 *   description: Update the current user
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserRegisterDto'
 *   responses:
 *   200:
 *    description: Successful operation
 *   401:
 *    description: Unauthorized
 */
router.put('/updateMe', 
    isAuth,
    [
        validator.body('username')
            .isLength({ min: 3 })
            .withMessage('username must be at least 3 characters long'),

        validator.body('email')
            .isEmail()
            .withMessage('Please enter a valid email'),

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
    controller.updateMe
);

/**
 * @swagger
 * /users/deleteMe:
 *  delete:
 *   tags: [Users]
 *   description: Delete the current user
 *   security:
 *   - bearerAuth: []
 *   responses:
 *   200:
 *    description: Successful operation
 *   401:
 *    description: Unauthorized
 */
router.delete('/deleteMe', isAuth, controller.deleteMe);

module.exports = router;