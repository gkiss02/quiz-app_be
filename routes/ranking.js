const controller = require('../controllers/ranking');
const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

/**
 * @swagger
 * /ranking/allTime:
 *  get:
 *   tags: [Ranking]
 *   description: Get all time ranking
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Successful operation
 *    401:
 *     description: Unauthorized
 */
router.get('/allTime', isAuth, controller.allTime);

/**
 * @swagger
 * /ranking/monthly:
 *  get:
 *   tags: [Ranking]
 *   description: Get monthly ranking
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Successful operation
 *    401:
 *     description: Unauthorized
 */
router.get('/monthly', isAuth, controller.monthly);

/**
 * @swagger
 * /ranking/weekly:
 *  get:
 *   tags: [Ranking]
 *   description: Get weekly ranking
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Successful operation
 *    401:
 *     description: Unauthorized
 */
router.get('/weekly', isAuth, controller.weekly);

/**
 * @swagger
 * /ranking/myRanking:
 *  get:
 *   tags: [Ranking]
 *   description: Get my ranking
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: Successful operation
 *    401:
 *     description: Unauthorized
 */
router.get('/myRanking', isAuth, controller.myRanking);

module.exports = router;