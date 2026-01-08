const {sendContactUsEmail} = require("../utils/email.util.js");

// Create a new contact form
const createContactForm = async (formData) => {
  const userDetails={};
  
  userDetails.fullName = formData.fullName;
  userDetails.phone = formData.phone;
  userDetails.email = formData.email;
  userDetails.subject = formData.subject;
  userDetails.message = formData.message;

  const response = sendContactUsEmail(userDetails);
  return response;
};

module.exports = {
  createContactForm,
};
