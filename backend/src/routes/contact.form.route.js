const express = require('express');
const router = express.Router();
const contactFormController = require('../controllers/contact.form.controller.js');
const { contactLimiter } = require("../middlewares/rate.limitter.js");


/**
 * @swagger
 * /contact-forms:
 *   post:
 *     summary: Submit a new contact form
 *     description: API to create a new contact form entry
 *     tags:
 *       - Contact Forms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phone
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the person
 *               phone:
 *                 type: string
 *                 description: Phone number of the person
 *               email:
 *                 type: string
 *                 description: Email address (optional)
 *               subject:
 *                 type: string
 *                 description: subject of the message
 *               message:
 *                 type: string
 *                 description: The message sent via the contact form
 *     responses:
 *       201:
 *         description: Contact form created successfully
 *       409:
 *         description: Conflict error (contact form with this phone number already exists)
 *       400:
 *         description: Bad request
 */
router.post('/',contactLimiter, contactFormController.createContactForm);

module.exports = router;
