import { registerConstants } from "../constants/registerConstants";
const initialState = {};

export function registerReducer(state = initialState, action) {
  switch (action.type) {
    case registerConstants.SET_REGISTER_DATA:
      return {...state ,...action.payload};
    case registerConstants.CLEAR_REGISTER_DATA:
      return action.payload;
    case registerConstants.REGISTRATION_REQUEST:
      return state
    default:
      return state;
  }
}
