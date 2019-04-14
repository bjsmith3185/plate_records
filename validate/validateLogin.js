// const isEmpty = require("./isEmpty");
// const isString = require("./isString");
const { hasWhiteSpace, isString, isEmpty } = require("./validateOperators");

module.exports = function validateLogin(data) {
  let errors = {};
  let isValid = false;
  let validUserName = false;
  let validPassword = false;

  // check userName
  if (isEmpty(data.userName)) {
    errors.userName = "User Name is empty";
  } else if (hasWhiteSpace(data.userName)) {
    errors.UserName = "User name can't contain spaces";
  } else {
    if (isString(data.userName)) {
      validUserName = true;
    } else {
      errors.userName = "User Name must be a string";
    }
  }

  // Check password
  if (isEmpty(data.password)) {
    errors.password = "Password is empty";
  } else if (hasWhiteSpace(data.password)) {
    errors.password = "Password can't contain spaces";
  } else {
    if (isString(data.password)) {
      validPassword = true;
    } else {
      errors.password = "Password must be a string";
    }
  }

  if (validUserName && validPassword) {
    isValid = true;
  }

  return {
    isValid: isValid,
    errors: errors
  };
};
