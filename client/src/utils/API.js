import axios from "axios";

export default {


  checkPassword: function (data) {  
    return axios.post("/api/users/login", data);
  },

  login: function (token) {
    var config = { "headers": {'authorization': token}};
    return axios.get("/api/users/info", config)
  },

  checkUserId: function (id, data) {
    console.log("api" + id)
    return axios.post("/api/users/login/" + id, data)
  }

};
