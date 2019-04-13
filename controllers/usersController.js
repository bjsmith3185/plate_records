const db = require("../models");

module.exports = {

  findAll: function () {
    return db.Users
      .find({})
  },
  findOne: function (data) {
    return db.Users
      .find(data)
  },
  create: function (data) {
    return db.Users
      .create(data)
  },
  update: function (company, data) {
    return db.Users
      .findOneAndUpdate({ company: company }, data, {upsert: true})
  },
  remove: function (company) {
    return db.Users
    .findOneAndRemove({company: company})
  },

  removeAll: function () {
    return db.Users
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


  

