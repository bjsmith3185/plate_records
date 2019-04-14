const { hasWhiteSpace, isString, isEmpty, hasLengthBetween, isValidEmail } = require("./validateOperators");

module.exports = function validateRegister(data) {
  let errors = {};
  let isValid = false;
  let validUserName = false;
  let validPassword = false;
  let validName = false;
  let validCode = false;
  let validOrg = false;
  let validEmail = false;


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
  } else if (!hasLengthBetween(data.password, 4, 10)) {
    errors.password = "Password should have a min 4, max 10 characters"
  } else {
    if (isString(data.password)) {
      validPassword = true;
    } else {
      errors.password = "Password must be a string";
    }
  }

  // check name
  if (isEmpty(data.name)) {
    errors.name = "Name is empty";
  } else if (!hasLengthBetween(data.name, 4, 20)) {
    errors.name = "Name should have a min 4 and max 20 characters"
  } else {
    if (isString(data.name)) {
      validName = true;
    } else {
      errors.name = "Password must be a string";
    }
  }

  // check code 
  if (isEmpty(data.code)) {
    errors.code = "Code is empty";
  } else if (!hasLengthBetween(data.code, 4, 20)) {
    errors.code = "Code should have a min 3 and max 10 characters"
  } else {
    if (isString(data.code)) {
      validCode = true;
    } else {
      errors.code = "Code must be a string";
    }
  }

  // Check org
  if (isEmpty(data.org)) {
    errors.org = "Org is empty";
  } else if (!hasLengthBetween(data.org, 4, 20)) {
    errors.org = "Org should have a min 2 and max 20 characters"
  } else {
    if (isString(data.org)) {
      validOrg = true;
    } else {
      errors.org = "Org must be a string";
    }
  }

  // Check email
  if (isEmpty(data.email)) {
    errors.email = "Email is empty";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Email is not valid"
  } else {
    if (isString(data.email)) {
      validEmail = true;
    } else {
      errors.email = "Email must be a string";
    }
  }



  if (validUserName && validPassword && validName && validCode && validOrg && validEmail) {
    isValid = true;
  }

  return {
    isValid: isValid,
    errors: errors
  };
};
