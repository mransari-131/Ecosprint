const express = require("express");
const cityController = require("../controllers/city.controller.js");
const router = express.Router(); 


/**
 * @swagger
 * /search/city:
 *   get:
 *     summary: Search for City
 *     tags: [City]
 *     parameters:
 *       - in: query
 *         name: pincode
 *         schema:
 *           type: string
 *       - in: query
 *         name: citytownvillage
 *         schema:
 *           type: string
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cities
 *       404:
 *         description: No cities found
 */
router.get("/", cityController.getCityDetails);

module.exports = router;
