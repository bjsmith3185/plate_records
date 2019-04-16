// this module will make sure the incoming data is in the correct format

module.exports = {
  conformSearchData: function(value) {
    // Modify tag data if necessary
    let objCopy = Object.assign({}, value);
    // remove '-' if entered
    if (objCopy.tag.includes("-")) {
      objCopy.tag = objCopy.tag.replace("-", "");
    }
    // remove space at the end, make lowercase
    objCopy.tag = objCopy.tag.toLowerCase().trim();

    // Modify state data if necessary
    // Make lowercase, remove space at the end
    objCopy.state = objCopy.state.toLowerCase().trim();
    return objCopy;
  },

  conformTagData: function(value) {
    // Modify tag data if necessary
    let objCopy = Object.assign({}, value);
    // remove '-' if entered
    if (objCopy.tag.includes("-")) {
      objCopy.tag = objCopy.tag.replace("-", "");
    }
    // remove space at the end, make lowercase
    objCopy.tag = objCopy.tag.toLowerCase().trim();
    return objCopy;
  },

  conformNewTagData: function(value) {
    // Modify tag data if necessary
    let objCopy = Object.assign({}, value);
    // Modify tag
    if (objCopy.tag.includes("-")) {
      objCopy.tag = objCopy.tag.replace("-", "");
    }
    objCopy.tag = objCopy.tag.toLowerCase().trim();
    // Modify state
    objCopy.state = objCopy.state.toLowerCase().trim();
    //Modify make
    objCopy.vehicleMake = objCopy.vehicleMake.toLowerCase().trim();
    //Modify model
    objCopy.vehicleModel = objCopy.vehicleModel.toLowerCase().trim();
    //Modify year
    objCopy.vehicleYear = objCopy.vehicleYear.trim();
    //Modify color
    objCopy.vehicleColor = objCopy.vehicleColor.toLowerCase().trim();
    //Modify owner
    objCopy.owner = objCopy.owner.toLowerCase().trim();
    //Modify address
    objCopy.address = objCopy.address.toLowerCase().trim();

    return objCopy;
  }
};
