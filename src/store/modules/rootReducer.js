import { combineReducers } from "redux";
import {
  login,
  isCreateAccountUser,
  isForgotPasswordUser,
  isInfoAccountUser,
  isInfoActiveUser,
} from "./login/reducer";

export default combineReducers({
  login,
  isCreateAccountUser,
  isForgotPasswordUser,
  isInfoAccountUser,
  isInfoActiveUser
});
