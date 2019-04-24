import { takeLatest, put } from "redux-saga/effects";
import API from "../utils/API";
import history from "../history/history"


//------------------------
// Check username and password, return token
function* checkPasswordAsync(data) {
// console.log(data)
  let user = {
    userName: data.payload.userName,
    password: data.payload.password
  }
  const myData = yield API.checkPassword(user);
  // console.log(myData)

  if (myData.data._id) {
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
  console.log(data)

    const myData = yield API.checkUserId(data.payload.userId);
    // console.log(myData)
    yield put({ type: "SET_USERINFO_TOKEN", val: myData });
  }
  
  export function* watchCheckUserId() {
    yield takeLatest("CHECK_USERID", checkUserIdAsync);
  }
  
  
  
  //-------------------------------------------------------

// Log out user
function* logOutAsync(data) {
  // console.log(data)
  yield put({ type: "SET_LOG_OUT", val: data });
}

export function* watchLogoutUser() {
  yield takeLatest("LOG_OUT", logOutAsync);
}

//-------------------------------------------------------------

// Search for tag info
function* searchTagAsync(data) {
  console.log(data)
  let searchData = {
    tag: data.payload.tag,
    state: data.payload.sate
  }

    const myData = yield API.searchTag(searchData, data.payload.token);
    // console.log(myData)
    // yield put({ type: "SET_TAG_INFO", val: myData });
  }
  
  export function* watchSearchTag() {
    yield takeLatest("SEARCH_TAG", searchTagAsync);
  }
  
  
  
  //-------------------------------------------------------
