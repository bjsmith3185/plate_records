// this module will make sure the incoming data is in the correct format

module.exports = {
  conformSearchData: function(value) {
    console.log("this is value")
    console.log(value)
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
  },

  conformNewEncounterData: function(value) {
    // Modify tag data if necessary
    let objCopy = Object.assign({}, value);

    if(objCopy.driver){
      objCopy.driver = objCopy.driver.toLowerCase().trim();
    }
    if(objCopy.location) {
      objCopy.location = objCopy.location.toLowerCase().trim();
    }
    if(objCopy.rs) {
      objCopy.rs = objCopy.rs.toLowerCase().trim();
    }
    if(objCopy.result) {
      objCopy.result = objCopy.result.toLowerCase().trim();
    }
    if(objCopy.encounterInfo) {
      objCopy.encounterInfo = objCopy.encounterInfo.toLowerCase().trim();
    }
    if(objCopy.officer) {
      objCopy.officer = objCopy.officer.toLowerCase().trim();
    }
    if(objCopy.encounterState) {
      objCopy.encounterState = objCopy.encounterState.toLowerCase().trim();
    }
    if(objCopy.encounterCity) {
      objCopy.encounterCity = objCopy.encounterCity.toLowerCase().trim();
    }
    
    return objCopy;
  },

  conformEncounterParams: function (id, state) {
    let errors = {};
    let data = {};

    if(id) {
      data.tag_id = id.toLowerCase().trim();
    } else {
      errors.tag_id = "No tag_id present in url"
    }

    if(state) {
      data.tagState = state.toLowerCase().trim();
    } else {
      errors.state = "No Tag State is present in url"
    }

    return {
      errors: errors,
      data: data
    }
  },

  conformParamsState: function(value) {
    if(value){
      return value.toLowerCase().trim();
    }
    return value
  },

  conformParamsId: function(value) {
    if(value) {
     return value.toLowerCase().trim();
    }
    return value;
  },

};
