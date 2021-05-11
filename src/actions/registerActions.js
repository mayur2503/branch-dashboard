import { registerConstants } from "../constants/registerConstants";
import { registerServices } from "../services/registerServices";
import { toastr } from "react-redux-toastr";
import { history } from "../helpers/history";
import { authConstants } from "../constants/authConstants";
import { loadingConstants } from "../constants/loadingConstants";
export const registerActions = {
  setRegistrationData,
  clearRegisterData,
  checkMobile,
  registration,
};

function checkMobile(data) {
  return async (dispatch) => {
    registerServices.checkmobile(data).then(
      (response) => {
        dispatch({
          type: registerConstants.SET_REGISTER_DATA,
          payload: data,
        });
        history.push("/register");
      },
      (error) => {
        toastr.error(error.response.data.message);
      }
    );
  };
}

function setRegistrationData(data) {
  return (dispatch) => {
    dispatch({
      type: registerConstants.SET_REGISTER_DATA,
      payload: data,
    });
  };
}

function registration(data) {
  return async (dispatch) => {
    try {
      dispatch({
        type: loadingConstants.SHOW_LOADER,
      });
      const response = await registerServices.register(data);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("mtoken", response.data.data.token);
      toastr.success(response.data.message);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: response.data.data,
      });
      dispatch({
        type: loadingConstants.HIDE_LOADER,
      });
    } catch (error) {
      dispatch({
        type: loadingConstants.HIDE_LOADER,
      });
      toastr.error(error.response.data.message);
    }
  };
}

function clearRegisterData(data = {}) {
  return (dispatch) => {
    dispatch({
      type: registerConstants.CLEAR_REGISTER_DATA,
      payload: data,
    });
  };
}
