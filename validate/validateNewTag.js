const {
  hasWhiteSpace,
  isString,
  isEmpty,
  hasLengthBetween,
  isValidState
} = require("./validateOperators");

module.exports = function validateNewTag(data) {
  let errors = {};
  let isValid = false;
  let validTag = false;
  let validState = false;
  let validMake = false;
  let validModel = false;
  let validYear = false;
  let validColor = false;
  let validOwner = false;
  let validAddress = false;

  // check Tag
  if (isEmpty(data.tag)) {
    errors.tag = "Tag is empty";
  } else if (hasWhiteSpace(data.tag)) {
    errors.tag = "Tag can't contain spaces";
  } else {
    if (isString(data.tag)) {
      validTag = true;
    } else {
      errors.tag = "Tag must be a string";
    }
  }

  // Check State
  if (isEmpty(data.state)) {
    errors.state = "State is empty";
  } else if (hasWhiteSpace(data.state)) {
    errors.state = "State can't contain spaces";
  } else if (!hasLengthBetween(data.state, 2, 3)) {
    errors.state = "State should have a min 2, max 2 characters";
  } else if (!isValidState(data.state)) {
    errors.state = "State does not exist";
  } else {
    if (isString(data.state)) {
        validState = true;
    } else {
      errors.state = "State must be a string";
    }
  }

  // check Make
  if (isEmpty(data.vehicleMake)) {
    errors.vehicleMake = "Vehicle Make is empty";
  } else if (!hasLengthBetween(data.vehicleMake, 2, 20)) {
    errors.vehicleMake =
      "Vehicle Make should have a min 2 and max 20 characters";
  } else {
    if (isString(data.vehicleMake)) {
      validMake = true;
    } else {
      errors.vehicleMake = "Vehicle Make must be a string";
    }
  }

  // check Model
  if (isEmpty(data.vehicleModel)) {
    errors.vehicleModel = "Vehicle Model is empty";
  } else if (!hasLengthBetween(data.vehicleModel, 2, 20)) {
    errors.vehicleModel =
      "Vehicle Model should have a min 2 and max 20 characters";
  } else {
    if (isString(data.vehicleModel)) {
      validModel = true;
    } else {
      errors.vehicleModel = "Vehicle Model must be a string";
    }
  }

  // check Year
  if (isEmpty(data.vehicleYear)) {
    errors.vehicleYear = "Vehicle Year is empty";
  } else if (!hasLengthBetween(data.vehicleYear, 2, 5)) {
    errors.vehicleYear =
      "Vehicle Year should have a min 2 and max 4 characters";
  } else {
    if (isString(data.vehicleYear)) {
      validYear = true;
    } else {
      errors.vehicleYear = "Vehicle Year must be a string";
    }
  }

  // check Color

  if (!hasLengthBetween(data.vehicleColor, 2, 20)) {
    errors.vehicleColor =
      "Vehicle Color should have a min 2 and max 20 characters";
  } else {
    if (isString(data.vehicleColor)) {
      validColor = true;
    } else {
      errors.vehicleColor = "Vehicle Color must be a string";
    }
  }

  // check Owner
  if (isEmpty(data.owner)) {
    errors.owner = "Owner is empty";
  } else if (!hasLengthBetween(data.owner, 2, 30)) {
    errors.owner = "Owner should have a min 2 and max 30 characters";
  } else {
    if (isString(data.owner)) {
      validOwner = true;
    } else {
      errors.owner = "Owner must be a string";
    }
  }

  // Check Address
  if (isEmpty(data.address)) {
    errors.address = "Address is empty";
  } else if (!hasLengthBetween(data.address, 4, 50)) {
    errors.address = "Address should have a min 2 and max 50 characters";
  } else {
    if (isString(data.address)) {
      validAddress = true;
    } else {
      errors.address = "Address must be a string";
    }
  }

  if (
    validTag &&
    validState &&
    validMake &&
    validModel &&
    validYear &&
    validColor &&
    validOwner &&
    validAddress
  ) {
    isValid = true;
  }
 
  return {
    isValid: isValid,
    errors: errors
  };
};
