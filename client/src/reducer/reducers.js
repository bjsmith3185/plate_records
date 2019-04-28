import initialState from "../store/state";

const setData = (state = initialState, action) => {
  const newState = { ...state };

  // set errors
  if (action.type === "SET_ERROR") {
    console.log(action.val)
    let errorData = {};
    if (action.val.data.error) {
      errorData = action.val.data.error;
    }

    return {
      ...state,
      errors: errorData
    };
  }

  if (action.type === "SET_USER") {
    // console.log(action.val)

    return {
      ...state,
      code: action.val.code,
      email: action.val.email,
      name: action.val.name,
      org: action.val.org,
      userName: action.userName,
      userId: action.val._id
    };
  }

  if (action.type === "SET_USERINFO_TOKEN") {
    // console.log(action.val)

    return {
      ...state,
      code: action.val.data.code,
      email: action.val.data.email,
      name: action.val.data.name,
      org: action.val.data.org,
      userName: action.val.data.userName,
      userId: action.val.data._id,
      token: action.val.data.token,
      isAuthenicated: action.val.data.isAuthenicated
    };
  }

  if (action.type === "SET_LOG_OUT") {
    // console.log(action.val)

    return {
      ...state,
      code: "",
      email: "",
      name: "",
      org: "",
      userName: "",
      userId: "",
      token: "",
      isAuthenicated: false,
      errors: {},
      currentResult: {},
      currentSearch: {},
      viewSearchComponent: true,
      viewEnterDataComponent: false,
      viewResultComponent: false
    };
  }

  if (action.type === "SET_TAG_INFO") {
    // console.log(action.val)

    return {
      ...state,
      currentResult: action.val.previousData.result,
      currentSearch: action.val.previousData.search,
      viewSearchComponent: action.val.view.viewSearchComponent,
      viewResultComponent: action.val.view.viewResultComponent,
      viewEnterDataComponent: action.val.view.viewEnterDataComponent
    };
  }

  if (action.type === "SET_VIEW") {
    // console.log(action.val.payload.data)

    return {
      ...state,
      viewSearchComponent: action.val.payload.data.viewSearchComponent,
      viewResultComponent: action.val.payload.data.viewResultComponent,
      viewEnterDataComponent: action.val.payload.data.viewEnterDataComponent
    };
  }

  if (action.type === "SET_PREV_RESULT") {
    // console.log(action.val.payload)

    return {
      ...state,
      currentResult: action.val.payload.data.result,
      currentSearch: action.val.payload.data.search,
      viewSearchComponent: action.val.payload.view.viewSearchComponent,
      viewResultComponent: action.val.payload.view.viewResultComponent,
      viewEnterDataComponent: action.val.payload.view.viewEnterDataComponent
    };
  }

  return newState;
};

export default setData;
