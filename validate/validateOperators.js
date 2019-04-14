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
  }
};
