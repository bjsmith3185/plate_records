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
  console.log(myData)

  if (myData.data._id) {
    myData.data.history = history;

    // let userData = myData.data;
    // userData.history = history;
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



//-------------------------------------------------------------------
// //   Set User data with token
// function* logInAsync(data) {
//   console.log(data)

//   // const myData = yield API.login(data.payload.token);
//   // console.log(myData)

//   try {
//     // let loginInfo = {
//     //   name: data.payload.name,
//     //   password: data.payload.password
//     // };
//     let history = data.payload.history;

//     const result = yield API.login(data.payload.token);
//     console.log(result)
//     if (result.data[0]._id) {
//       sessionStorage.setItem("userId", result.data[0]._id);
//       yield put({ type: "SET_USER", val: result.data[0] });
//       history.push("/home");
//     } else {
//       console.log("incorrect login");
//     }
//   } catch (e) {
//     console.log("there was an error reaching the server");
//     console.log(e);
//   }
// }

// export function* watchLogIn() {
//   yield takeLatest("LOG_IN", logInAsync);
// }

//-------------------------------------

// Check user _id, return token
function* checkUserIdAsync(data) {
  // console.log(data)
    // let user = {
    //   userName: data.payload.userName,
    //   password: data.payload.password
    // }
    const myData = yield API.checkUserId(data.payload.userId);
    console.log(myData)
    myData.history = data.payload.history;
    yield put({ type: "SET_USERINFO_TOKEN", val: myData });
  }
  
  export function* watchCheckUserId() {
    yield takeLatest("CHECK_USERID", checkUserIdAsync);
  }
  
  
  
  //-----------------------------------------------------------------

