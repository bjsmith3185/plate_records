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
function* searchStateTagAsync(data) {
  console.log(data)
  // let searchData = {
  //   tag: data.payload.tag,
  //   state: data.payload.sate
  // }

    const myData = yield API.searchStateTag(data.payload.state, data.payload.tag, data.payload.token);
    console.log(myData)
    // yield put({ type: "SET_TAG_INFO", val: myData });
  }
  
  export function* watchSearchStateTag() {
    yield takeLatest("SEARCH_STATE_TAG", searchStateTagAsync);
  }
  
  
  
  //-------------------------------------------------------

  // Search for tag info
function* searchTagAsync(data) {
  console.log(data)
  let myData = [];
  let SearchData = {};
  let isState = '';

  // If a state is provided
  if(data.payload.state) {
    isState = data.payload.state
    myData = yield API.searchStateTag(data.payload.state, data.payload.tag, data.payload.token);
  } 
  // If the state is omitted
  else {
    myData = yield API.searchTag(data.payload.tag, data.payload.token);
  }

  let setData = {
    result: myData.data[0],
    search: {
      tag: data.payload.tag,
      state: isState
    }
  }

    yield put({ type: "SET_TAG_INFO", val: setData });
  }
  
  export function* watchSearchTag() {
    yield takeLatest("SEARCH_TAG", searchTagAsync);
  }
   
  //-------------------------------------------------------
// Toggle  search / result views in the Body component
function* switchViewAsync(data) {
  console.log(data)
  yield put({ type: "SET_SEARCH_VIEW", val: data });
}

export function* watchSwitchView() {
  yield takeLatest("SWITCH_VIEW", switchViewAsync);
}

//-------------------------------------------------------------












