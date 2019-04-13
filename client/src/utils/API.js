import axios from "axios";


export default {

  getNames: function () {  
    return axios.get("/api/users");
  },
 

  
};

