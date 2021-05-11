import { combineReducers } from 'redux';
import { registerReducer } from './registerReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'
import { authReducer } from './authReducer';
import { loadingReducer } from './loadingReducer';

export default combineReducers({
  register:registerReducer,
  user : authReducer,
  toastr: toastrReducer,
  loader:loadingReducer
});