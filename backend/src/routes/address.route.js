const express = require("express");
const addressController = require("../controllers/address.controller.js");
const {uploadReviewImage}= require("../middlewares/multer.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Address Management
 */

/**
 * @swagger
 * /address/add:
 *   post:
 *     summary: Create a new address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pincode:
 *                 type: string
 *               flatHouseBuildingCompanyApartment:
 *                 type: string
 *               areaStreetSectorVillage:
 *                 type: string
 *               landmark:
 *                 type: string
 *               townCity:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post("/add",auth, addressController.createAddress);

/**
 * @swagger
 * /address/{id}:
 *   get:
 *     summary: Get a address by its ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address data
 *       404:
 *         description: Address not found
 */
router.get("/:id", addressController.getAddressById);

/**
 * @swagger
 * /address/:
 *   get:
 *     summary: Get all address
 *     tags: [Address]
 *     responses:
 *       200:
 *         description: Addresses data
 *       404:
 *         description: Addresses not found
 */
router.get("/", addressController.getAllAddresses);

/**
 * @swagger
 * /address/{id}/update:
 *   put:
 *     summary: Update a address by its ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pincode:
 *                 type: string
 *               flatHouseBuildingCompanyApartment:
 *                 type: string
 *               areaStreetSectorVillage:
 *                 type: string
 *               landmark:
 *                 type: string
 *               townCity:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id/update", addressController.updateAddress);

/**
 * @swagger
 * /address/{id}/delete:
 *   delete:
 *     summary: Delete a review by its ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       404:
 *         description: Address not found
 */
router.delete("/:id/delete", addressController.deleteAddress);

module.exports = router;
