const validator = require("validator");
const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password, phoneNumber } = req.body;
  if (!firstName || !lastName || !emailId || !password || !phoneNumber) {
    throw new Error("All fields are required");
  } else if (firstName.length < 4 || firstName.length > 20) {
    throw new Error("First name must be between 4 and 20 characters");
  } else if (lastName.length < 4 || lastName.length > 20) {
    throw new Error("Last name must be between 4 and 20 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is invalid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  } else if (!validator.isMobilePhone(phoneNumber, "any")) {
    throw new Error("Phone number is invalid");
  }
};

module.exports = { validateSignupData };