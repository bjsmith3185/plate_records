import axios from "axios";

export default {


  checkPassword: function (data) {  
    return axios.post("/api/users/login", data);
  },

  checkUserId: function (id, data) {
    return axios.post("/api/users/login/" + id, data)
  },

  searchStateTag: function (state, tag, token) {
    var config = { "headers": {'authorization': token}};
    return axios.get("/api/search/" + state + "/" + tag, config)
  },

  searchTag: function (tag, token) {
    var config = { "headers": {'authorization': token}};
    return axios.get("/api/search/all/" + tag, config)
  },

  stopData: function (state, tag, data, token) {
    var config = { "headers": {'authorization': token}};
    // console.log(data)
    // console.log(config)
    return axios.post("/api/encounter/new/" + tag + "/" + state, data, config)
  },

  addNewUser: function (data) {
    return axios.post("/api/users/new", data)
  },

  addNewTags: function (state, data) {
    return axios.post("/api/tag/new/multi/" + state, data)
  },

  removeEncounters: function () {
    // console.log("!!!!!!")
    return axios.delete("/api/encounter/delete/all")
  },
  

};

