import { combineReducers } from "redux";
import login from "./login";
import dashboardControls from "./dashboardControls";

export default combineReducers({
 login,
 dashboardControls
});