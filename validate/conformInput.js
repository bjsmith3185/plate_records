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


};
