const initialState = {
  profile_created_for:"",
  gender:"",
  name:"",
  mobile:""
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case "TURN_TITLE_GREEN":
        return {
          ...state,
          titleColor: "green",
        };
      case "UPDATE_TITLE":
        return {
          ...state,
          title: action.payload,
        };
      default:
        return state;
    }
  };
  