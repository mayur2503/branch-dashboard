import { loadingConstants } from "../constants/loadingConstants";
const initialState = {isLoading:false};

export function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case loadingConstants.SHOW_LOADER:
      return {isLoading:true};
    case loadingConstants.HIDE_LOADER:
      return {isLoading:false};
    default:
      return state;
  }
}
