module.exports = {
  hasWhiteSpace: function(value) {
    return value.indexOf(" ") >= 0;
  },

  isString: function(value) {
    return typeof value === "string";
  },

  isEmpty: function(value) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  },

  hasLengthBetween: function(value, min, max) {
    return value.length > min - 1 && value.length < max;
  },

  isValidEmail: function(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  },

  // below are used for tag input

  isValidState: function(value) {
      const allStates = ['nc', 'sc'];
      for (var i = 0; i < allStates.length; i++) {
        if (allStates[i] === value) {
          return true
        }
      }
  }, 

  // containsSpecialCharacters: function(value) {
  //   const charArray = ['!', '@', '#','"','$','+','%','&','*','+',',']
  //   const letterNumber = /^[0-9a-zA-Z]+$/;
  //   // if((value.value.match(letterNumber)){
  //   //   // has only letters and numbers
  //   // }

  // },


};
