
const { hasWhiteSpace, isString, isEmpty, isValidState, hasLengthBetween } = require("./validateOperators");

module.exports = function validateSearch(data) {
  let errors = {};
  let isValid = false;
  let validState = false;
  let validTag = false;

  console.log(data)

  // check state
  if (isEmpty(data.state)) {
    errors.state = "State is empty";
  } else if (hasWhiteSpace(data.state)) {
    errors.state = "State can't contain spaces";
  } else if (!isValidState(data.state)) {
    errors.state = "Is not a valid state abreviation"
  } else {
    if (isString(data.state)) {
      validState = true;
    } else {
      errors.state = "State must be a string";
    }
  }

  // Check tag
  
  if (isEmpty(data.tag)) {
    errors.tag = "Tag is empty";
  } else if (hasWhiteSpace(data.tag)) {
    errors.tag = "Tag can't contain spaces";
  } else if(!hasLengthBetween(data.tag, 1, 10)) {
    errors.tag = "Tag contains too many characters"
  } else {
    if (isString(data.tag)) {
      validTag = true;
    } else {
      errors.tag = "Tag must be a string";
    }
  }

  if (validState && validTag) {
    isValid = true;
  }

  return {
    isValid: isValid,
    errors: errors
  };
};






































