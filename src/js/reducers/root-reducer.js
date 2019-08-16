import { combineReducers } from "redux";
import login from "./login";
import dashboard from "./dashboard";

export default combineReducers({
 login,
 dashboard
});