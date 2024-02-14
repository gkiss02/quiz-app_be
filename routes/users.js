const controller = require('../controllers/users');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isAuth = require('../middleware/isAuth');

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

module.exports = router;