import { takeLatest, put } from "redux-saga/effects";
import API from "../utils/API";
import history from "../history/history";

// Check username and password, return token
function* checkPasswordAsync(data) {
  // console.log(data)
  let user = {
    userName: data.payload.userName,
    password: data.payload.password
  };
  const myData = yield API.checkPassword(user);
  // console.log(myData)

  if (myData.data._id) {
    sessionStorage.setItem("userId", myData.data._id);
    sessionStorage.setItem("token", myData.data.token);
    yield put({ type: "SET_USERINFO_TOKEN", val: myData });
    history.push("/home");
  } else {
    console.log("incorrect login");
    yield put({ type: "SET_ERROR", val: myData });
  }
}

export function* watchCheckPassword() {
  yield takeLatest("CHECK_PASSWORD", checkPasswordAsync);
}

//-------------------------------------

// Check user _id, return token
function* checkUserIdAsync(data) {
  // console.log(data)

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
  // clear session storage
  sessionStorage.clear();
  yield put({ type: "SET_LOG_OUT", val: data });
}

export function* watchLogoutUser() {
  yield takeLatest("LOG_OUT", logOutAsync);
}

//-------------------------------------------------------------

function* searchTagAsync(data) {
  // console.log(data)
  let myData = [];
  let multipleMatches = false;
  let search = {
    tag: data.payload.tag,
    state: "",
    tag_id: ""
  };

  // If a state is provided
  if (data.payload.state) {
    search.state = data.payload.state;
    myData = yield API.searchStateTag(
      data.payload.state,
      data.payload.tag,
      data.payload.token
    );

    if(myData.data.error) {
      if (myData.data.error) {
        yield put({ type: "SET_ERROR", val: myData });
      }
    } else {
      search.tag_id = myData.data[0]._id;
    }

  }

  // If the state is omitted
  else {
    myData = yield API.searchTag(data.payload.tag, data.payload.token);

    if(myData.data.length > 1) {
      multipleMatches = true;
       // define a new dispach action for a multiple result

              let setData = {
                previousData: {
                  result: myData.data,
                  search: search
                },
          
                view: {
                  viewSearchComponent: false,
                  viewResultComponent: true,
                  viewEnterDataComponent: false
                },
                multipleMatches: multipleMatches
              };
          
              // store the latest result in session storage
              sessionStorage.setItem("lastResult", JSON.stringify(setData.previousData));
              sessionStorage.setItem("view", JSON.stringify(setData.view));
              sessionStorage.setItem("multipleMatches", JSON.stringify(setData.multipleMatches))
              // clear any existing data saved in encounter form
              sessionStorage.removeItem("encounterData");

       return yield put({ type: "SET_MULTI_TAG_INFO", val: setData });
    
    }

  }

  // if the response contains an error
  if (myData.data.error) {
    yield put({ type: "SET_ERROR", val: myData });
  }
  // if the response contains good data
  else {
    // set the tag state and tag_id to the search {} above
    search.tag_id = myData.data[0]._id;
    search.state = myData.data[0].state;


    let setData = {
      previousData: {
        result: myData.data[0],
        search: search
      },

      view: {
        viewSearchComponent: false,
        viewResultComponent: true,
        viewEnterDataComponent: false
      },
      multipleMatches: multipleMatches
    };

    // store the latest result in session storage
    sessionStorage.setItem("lastResult", JSON.stringify(setData.previousData));
    sessionStorage.setItem("view", JSON.stringify(setData.view));
    sessionStorage.setItem("multipleMatches", JSON.stringify(setData.multipleMatches))
    // clear any existing data saved in encounter form
    sessionStorage.removeItem("encounterData");
    
    yield put({ type: "SET_TAG_INFO", val: setData });
  }
}

export function* watchSearchTag() {
  yield takeLatest("SEARCH_TAG", searchTagAsync);
}

//-------------------------------------------------------
// Toggle  search / result views in the Body component
function* selectTagAsync(data) {
  console.log(data.payload);

  let setData = {
    previousData: {
      result: data.payload.data.currentResult,
      search: data.payload.data.currentSearch
    },

    view: {
      viewSearchComponent: false,
      viewResultComponent: true,
      viewEnterDataComponent: false
    },
    multipleMatches: data.payload.data.multipleMatches
  };

// going to use existing action SET_TAG_INFO
  // store the latest result in session storage
  sessionStorage.setItem("lastResult", JSON.stringify(setData.previousData));
  sessionStorage.setItem("view", JSON.stringify(setData.view));
  sessionStorage.setItem("multipleMatches", JSON.stringify(setData.multipleMatches))
  // clear any existing data saved in encounter form
  sessionStorage.removeItem("encounterData");
    
  yield put({ type: "SET_TAG_INFO", val: setData });

}

export function* watchSelectTag() {
  yield takeLatest("SELECT_TAG", selectTagAsync);
}

//-------------------------------------------------------
// Toggle  search / result views in the Body component
function* switchViewAsync(data) {
  // set view status in session storage
  sessionStorage.setItem("view", JSON.stringify(data.payload.data));

  yield put({ type: "SET_VIEW", val: data });
}

export function* watchSwitchView() {
  yield takeLatest("SWITCH_VIEW", switchViewAsync);
}

//-------------------------------------------------------------
// Set last search results from session storage
function* setPrevAsync(data) {
  // console.log(data)
  yield put({ type: "SET_PREV_RESULT", val: data });
}

export function* watchSetPrev() {
  yield takeLatest("PREV_RESULT", setPrevAsync);
}

//-------------------------------------------------------------

// Upload new encounter data
function* stopDataAsync(data) {
  // console.log(data)
  // console.log(data.payload.data.vehicle)

  const myData = yield API.stopData(
    data.payload.data.vehicle.state,
    data.payload.data.vehicle.tag_id,
    data.payload.data.encounter,
    data.payload.token
  );
  // console.log(myData.data[0]);

  // Check myData for errors
  // Set myData to currentResult in session storage
  let setData = {
    previousData: {
      result: myData.data[0],
      search: {
        tag: data.payload.data.vehicle.tag,
        state: data.payload.data.vehicle.state,
        tag_id: data.payload.data.vehicle.tag_id
      },
    },

    view: {
      viewSearchComponent: false,
      viewResultComponent: true,
      viewEnterDataComponent: false
    }
  };
;
  // store the latest result in session storage
  sessionStorage.setItem("lastResult", JSON.stringify(setData.previousData));
  sessionStorage.setItem("view", JSON.stringify(setData.view));

  // let setData = {
  //   result: myData.data[0],

  //   search: {
  //     tag: data.payload.data.tag,
  //     state: data.payload.data.state,
  //     tag_id: data.payload.data.tag_id
  //   },
  //   view: {
  //     viewSearchComponent: false,
  //     viewResultComponent: true,
  //     viewEnterDataComponent: false
  //   }
  // };

  // // store the latest result in session storage
  // sessionStorage.setItem("lastResult", JSON.stringify(setData));
  // // set the view in session storage
  // sessionStorage.setItem("lastResult", JSON.stringify(setData));



  // Set data.payload.data.vehicle to currentSearch in session
  // Set/Create a field in the store to show the search component.

  yield put({ type: "SET_TAG_INFO", val: setData });
  // yield put({ type: "SET_STOP_DATA", val: setData });
}

export function* watchStopData() {
  yield takeLatest("STOP_DATA", stopDataAsync);
}

//-------------------------------------------------------
// Add new user
function* addUserAsync(data) {
  // set view status in session storage
  // console.log("saga add new user")
  // console.log(data)

  const newUser = yield API.addNewUser(data.payload.data);

  yield put({ type: "ADDED_USER", val: newUser.data });
}

export function* watchAddUser() {
  yield takeLatest("ADD_USER", addUserAsync);
}

//-------------------------------------------------------------

// Add multiple tags
function* addTagsAsync(data) {
  // set view status in session storage
 
  const newTags = yield API.addNewTags(data.payload.state, data.payload.data);

  yield put({ type: "ADDED_TAGS", val: newTags.data });
}

export function* watchAddTags() {
  yield takeLatest("ADD_TAGS", addTagsAsync);
}

//-------------------------------------------------------------

// Clear Encounters collection
function* clearEncountersAsync() {
  // console.log("in the saga for delete encounters")
  const noEncounters = yield API.removeEncounters();
  // console.log(newTags)

  yield put({ type: "ENCOUNTERS_CLEARED", val: noEncounters });
}

export function* watchClearEncounters() {
  yield takeLatest("CLEAR_ENCOUNTERS", clearEncountersAsync);
}

//-------------------------------------------------------------

// Toggle Dropdown menu
function* dropDownAsync(data) {
  console.log(data)

  yield put({ type: "SET_DROP_DOWN", val: data });
}

export function* watchDropDown() {
  yield takeLatest("DROP_DOWN", dropDownAsync);
}

//-------------------------------------------------------------



























