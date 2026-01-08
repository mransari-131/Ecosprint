const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
  fullName: { type: String, match:/^[a-zA-Z\s]+$/, required: true },
  phone: { type: String, match:/^\d{10}$/, required: true },
  email: { type: String, match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/},
  
  subject: { type: String, match:/^[a-zA-Z\s]+$/, required: true },
  message: { type: String, minlength: 6, maxlength: 3000, match: /^[a-zA-Z0-9"'.,\/\?\-\=\\!%&()_ ]+$/},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
},{timestamps: true});

const ContactForm = mongoose.model("ContactForm", contactFormSchema);
module.exports = ContactForm;
