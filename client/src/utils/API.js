import axios from "axios";

export default {


  checkPassword: function (data) {  
    return axios.post("/api/users/login", data);
  },

  checkUserId: function (id, data) {
    return axios.post("/api/users/login/" + id, data)
  },

  searchTag: function (data, token) {
    var config = { "headers": {'authorization': token}};
    console.log(config)
    return axios.get("/api/search", config)
  },

};


// login: function (token) {
//   var config = { "headers": {'authorization': token}};
//   return axios.get("/api/users/info", config)
// }