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
  }
};
