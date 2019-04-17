import initialState from "../store/state";

const setData = (state = initialState, action) => {
  const newState = { ...state };

  // open/close dropdown menu
  if (action.type === "SET_TOKEN") {
    console.log(action)
    // console.log(action.val.data.token)
    // console.log(action.val.history)

    return {
      ...state,
      token: action.val.data.token,
      history: action.val.history
      
    };
  }

  if (action.type === "SET_USER") {
    console.log(action.val)

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

 

  return newState;
};

export default setData;
