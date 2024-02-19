const controller = require('../controllers/users');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isAuth = require('../middleware/isAuth');
const validator = require('express-validator');

/**
 * @swagger
 * components:
 *      schemas:
 *       UserUpdateEmailDto:
 *        type: object
 *        properties:
 *          email:
 *           type: string
 *       UserUpdatePasswordDto:
 *        type: object
 *        properties:
 *         password:
 *          type: string
 *         passwordConfirm:
 *          type: string
 *       UserUpdateProfilePictureDto:
 *        type: object
 *        properties:
 *         profilePicture:
 *          type: string
 */ 

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
 * /users/updateEmail:
 *  patch:
 *   tags: [Users]
 *   description: Update the current user email
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserUpdateEmailDto'
 *     schema:
 *   responses:
 *   200:
 *    description: Successful operation
 *   401:
 *    description: Unauthorized
 */
router.patch('/updateEmail', 
    isAuth,
    [
        validator.body('email')
            .isEmail()
            .withMessage('Please enter a valid email'),
    ],
    controller.updateEmail
);

/**
 * @swagger
 * /users/updatePassword:
 *  patch:
 *   tags: [Users]
 *   description: Update the current user password
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserUpdatePasswordDto'
 *    schema:
 *   responses:
 *   200:
 *    description: Successful operation
 *   401:
 *    description: Unauthorized
 */
router.patch('/updatePassword',
    isAuth,
    [
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
    controller.updatePassword
);

/**
 * @swagger
 * /users/updateProfilePicture:
 *  patch:
 *   tags: [Users]
 *   description: Update the current user profile picture
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserUpdateProfilePictureDto'
 *    schema:
 *   responses:
 *   200:
 *    description: Successful operation
 *   401:
 *    description: Unauthorized
 */
router.patch('/updateProfilePicture', isAuth, controller.updateProfilePicture);

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