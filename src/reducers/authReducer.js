import { authConstants } from "../constants/authConstants";
let user = JSON.parse(localStorage.getItem("user"));
let token = localStorage.getItem("token");
const initialState = user ? { ...user,token:token ,loggedIn: true } : {loggedIn: false};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: { user: action.payload.user, token: action.payload.token },
        registration_track: action.payload.registration_track,
      };
    case authConstants.LOGIN_FAILURE:
      return {};
    case authConstants.LOGOUT:
      return {
        loggedIn: false
      };
    default:
      return state;
  }
}
