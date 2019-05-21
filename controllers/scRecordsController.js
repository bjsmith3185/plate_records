const db = require("../models");

module.exports = {

  findAll: function () {
    return db.SCRecords
      .find({})
      .populate({
        path: 'encounters',
        options: {
          sort: {date: 'desc'}
        },
           populate: {
          path: 'officer'
        }
       
      })
  },

  findById: function (id) {
    return db.SCRecords
      .find({_id: id})
      .populate({
        path: 'encounters',
        options: {
          sort: {date: 'desc'}
        },
           populate: {
          path: 'officer'
        }
       
      })
  },

  findByTag: function (tag) {
    return db.SCRecords
      .find({tag: tag})
      .populate({
        path: 'encounters',
        options: {
          sort: {date: 'desc'}
        },
           populate: {
          path: 'officer'
        }
       
      })
  },

  findTags: function (tag) {
    return db.SCRecords
    .where({ tag: tag})
  },


  findByState: function (state) {
    return db.SCRecords
    .find({})
    .where({state: state})
  },

  create: function (data) {
    return db.SCRecords
      .create(data)
  },
  createMany: function (data) {
    return db.SCRecords
      .insertMany(data)
  },
  update: function (id, data) {
    return db.SCRecords
      .findOneAndUpdate(id, data, {upsert: true})
  },
  remove: function (id) {
    return db.SCRecords
    .findOneAndRemove({_id: id})
  },

  removeAll: function () {
    return db.SCRecords
    .deleteMany({})
  },

};





