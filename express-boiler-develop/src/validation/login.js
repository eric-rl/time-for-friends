const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.password = !isEmpty(data.password) ? data.password : "";
// username checks
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "username field is required";
  } 
  // else if (!Validator.isUsername(data.userName)) {
  //   errors.userName = "username is invalid";
  // }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};