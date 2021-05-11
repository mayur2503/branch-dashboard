import { authConstants } from "../constants/authConstants";

import { registerServices } from "../services/registerServices";
import { toastr } from "react-redux-toastr";
import { history } from "../helpers/history";
import { authServices } from "../services/authServices";
import { loadingConstants } from "../constants/loadingConstants";

export const authActions = {
  login,
  logout,
};

function login(username, passowrd) {
  return async (dispatch) => {
    try {
      dispatch({
        type: loadingConstants.SHOW_LOADER,
      });
      const response = await authServices.login(username, passowrd);
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.data.token);
        toastr.success(response.data.message);
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: response.data.data,
        });
        dispatch({
          type: loadingConstants.HIDE_LOADER,
        });
        window.location.replace('/')
        return;
      }
      dispatch({
        type: loadingConstants.HIDE_LOADER,
      });
      toastr.error(response.data.message);
    } catch (error) {
      dispatch({
        type: loadingConstants.HIDE_LOADER,
      });
      toastr.error(error.response.data.message);
    }
  };
}

function logout() {
  return async (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({
      type: authConstants.LOGOUT,
    });
    history.push("/");
  };
}
