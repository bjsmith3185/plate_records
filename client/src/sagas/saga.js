import { takeLatest, put } from "redux-saga/effects";
import API from "../utils/API";



//------------------------
// Check username and password, return token
function* checkPasswordAsync(data) {
// console.log(data)
let history = data.payload.history;
  let user = {
    userName: data.payload.userName,
    password: data.payload.password
  }
  const myData = yield API.checkPassword(user);
  // console.log(myData)

  if (myData.data._id) {
    myData.data.history = history;
    sessionStorage.setItem("userId", myData.data._id);
    sessionStorage.setItem("token", myData.data.token);
    yield put({ type: "SET_USERINFO_TOKEN", val: myData });
    history.push("/home");
  } else {
    console.log("incorrect login");
    yield put({ type: "SET_ERROR", val: myData})
  }

}

export function* watchCheckPassword() {
  yield takeLatest("CHECK_PASSWORD", checkPasswordAsync);
}


//-------------------------------------

// Check user _id, return token
function* checkUserIdAsync(data) {

    const myData = yield API.checkUserId(data.payload.userId);
    // console.log(myData)
    myData.history = data.payload.history;
    yield put({ type: "SET_USERINFO_TOKEN", val: myData });
  }
  
  export function* watchCheckUserId() {
    yield takeLatest("CHECK_USERID", checkUserIdAsync);
  }
  
  
  
  //-----------------------------------------------------------------

