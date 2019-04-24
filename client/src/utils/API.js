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

};

