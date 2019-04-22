import initialState from "../store/state";

const setData = (state = initialState, action) => {
  const newState = { ...state };

  // open/close dropdown menu
  if (action.type === "SET_ERROR") {
    // console.log(action)
    let errorData = {};
    if(action.val.data.error) {
      errorData = action.val.data.error
    } 

    return {
      ...state,
       errors: errorData,
    };
  }


  if (action.type === "SET_USER") {
    // console.log(action.val)

    return {
      ...state,
      code:action.val.code,
      email:action.val.email,
      name:action.val.name,
      org:action.val.org,
      userName:action.userName,
      userId: action.val._id,
    }
  }

  if (action.type === "SET_USERINFO_TOKEN") {
    // console.log(action.val)

    return {
      ...state,
      code:action.val.data.code,
      email:action.val.data.email,
      name:action.val.data.name,
      org:action.val.data.org,
      userName:action.val.data.userName,
      userId: action.val.data._id,
      token: action.val.data.token,
      isAuthenicated: action.val.data.isAuthenicated
    }
  }

 

  return newState;
};

export default setData;