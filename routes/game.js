const controller = require('../controllers/game');
const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

/**
 * @swagger
 * /game/createGame/{difficulty}:
 *  post:
 *   tags: [Game]
 *   description: Get the current user
 *   parameters:
 *    - in: path
 *      name: difficulty
 *      required: true
 *      type: integer
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Successful operation
 *    401:
 *     description: Unauthorized
 */
router.post('/createGame/:difficulty', isAuth, controller.createGame);

/**
 * @swagger
 * /game/increaseScore:
 *  patch:
 *   tags: [Game]
 *   description: Update the current user's game
 *   security:
 *   - bearerAuth: []
 *   responses:
 *    200:
 *     description: Successful operation
 *    401:
 *     description: Unauthorized
 */
router.patch('/increaseScore', isAuth, controller.increaseScore);

/**
 * @swagger
 * /game/getLatestGameScore:
 *  get:
 *   tags: [Game]
 *   description: Get the current user's game score
 *   security:
 *   - bearerAuth: []
 *   responses:
 *    200:
 *     description: Successful operation
 *    401:
 *     description: Unauthorized
 */
router.get('/getLatestGameScore', isAuth, controller.getLatestGameScore);

module.exports = router;