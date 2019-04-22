import axios from "axios";

export default {


  checkPassword: function (data) {  
    return axios.post("/api/users/login", data);
  },

  checkUserId: function (id, data) {
    return axios.post("/api/users/login/" + id, data)
  }

};
