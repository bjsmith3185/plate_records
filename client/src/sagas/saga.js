import { takeLatest, put } from "redux-saga/effects";
import API from "../utils/API";


// // opens closes dropdown menu
// function* dropDownAsync(data) {
//    yield put({ type: "SET_DROPDOWN_MENU", val: data.payload });
// }

// export function* watchDropdown() {
//   yield takeLatest("SHOW_DROPDOWN_MENU", dropDownAsync);
// }



//------------------------
// Log In 
function* checkPasswordAsync(data) {
console.log(data)
  // let user = {
  //   userName: data.payload.userName,
  //   password: data.payload.password
  // }
  const myData = yield API.checkPassword(data.payload);

  // myData.history = data.payload.history;
  yield put({ type: "SET_TOKEN", val: myData });
}

export function* watchCheckPassword() {
  yield takeLatest("CHECK_PASSWORD", checkPasswordAsync);
}



//-------------------------------------------------------------------
//   Log in user
function* logInAsync(data) {
  console.log(data)

  // const myData = yield API.login(data.payload.token);
  // console.log(myData)

  try {
    // let loginInfo = {
    //   name: data.payload.name,
    //   password: data.payload.password
    // };
    let history = data.payload.history;

    const result = yield API.login(data.payload.token);
    console.log(result)
    if (result.data[0]._id) {
      localStorage.setItem("userId", result.data[0]._id);
      yield put({ type: "SET_USER", val: result.data[0] });
      history.push("/home");
    } else {
      console.log("incorrect login");
    }
  } catch (e) {
    console.log("there was an error reaching the server");
    console.log(e);
  }
}

export function* watchLogIn() {
  yield takeLatest("LOG_IN", logInAsync);
}



