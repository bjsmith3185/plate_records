const db = require("../models");

module.exports = {

  findAll: function () {
    return db.NCRecords
      .find({})
      .populate({
        path: 'encounters',
        populate: {
          path: 'officer'
        }
      })
  },

  findById: function (id) {
    console.log("in nc controller: " + id)
    return db.NCRecords
      .find({_id: id})
      .populate({
        path: 'encounters',
        populate: {
          path: 'officer'
        }
      })
  },

  findByTag: function (tag) {
    return db.NCRecords
      .find({tag: tag})
      .populate({
        path: 'encounters',
        populate: {
          path: 'officer'
        }
      })
  },

  findTags: function (tag) {
    return db.NCRecords
    .where({ tag: tag})
  },


  findByState: function (state) {
    return db.NCRecords
    .find({})
    .where({state: state})
  },

  create: function (data) {
    return db.NCRecords
      .create(data)
  },
  // update: function (id, data) {
  //   return db.NCRecords
  //     .findOneAndUpdate(id, data, {upsert: true})
  // },
  update: function (id, data) {
    return db.NCRecords
      .findOneAndUpdate({_id: id}, data, {upsert: true})
  },
  remove: function (company) {
    return db.NCRecords
    .findOneAndRemove({company: company})
  },

  removeAll: function () {
    return db.NCRecords
    .deleteMany({})
  },

};















  // findAll: function (req, res) {
  //   db.Advertisements
  //     .find({})
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },


  // findById: function (req, res) {
  //   db.Advertisements
  //     .findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  
  // create: function (req, res) {
  //   console.log("this is the data from the create ad");
  //   console.log(req.body);
  //   db.Advertisements
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // update: function (req, res) {
  //   db.Advertisements
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function (req, res) {
  //   db.Advertisements
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },

  // this function finds an ad to show on load
  // findAPageLoadAd: function (req, res) {

  //   db.Advertisements
  //     .find(req.query)
  //     .then(dbModel => {

  //       let value = newAd.determineAd(dbModel)
  //       res.json(value)
  //     })
  //     .catch(err => res.status(422).json(err));
  // },

  // // this function finds an ad specific to user searches
  // findSelectedAd: function (req, res) {

  //   db.Advertisements
  //     .find({})
  //     .then(dbModel => {

  //       db.Searches
  //         .find({})
  //         .then(allSearches => {
  //           let value = adLogic.determineAd(dbModel, allSearches)
  //           res.json(value)
  //         })
  //     })
  //     .catch(err => res.status(422).json(err));

  // },


  

