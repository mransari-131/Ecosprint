const contactFormService = require('../services/contact.form.service.js');
const logger = require("../configs/winston.config.js");

// Create a new contact form
const createContactForm = async (req, res, next) => {
  try {
    const contactForm = await contactFormService.createContactForm(req.body);
    res.status(201).json({
      data: contactForm,
    });
  } catch (error) {
    next(error);
  }
};

module.exports= {createContactForm};
