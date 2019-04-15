
const NC = require('./ncRecordsController');
const SC = require('./scRecordsController');

const stateCollections = [ NC, SC ]

exports.all = stateCollections;