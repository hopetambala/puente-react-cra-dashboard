import { combineReducers } from "redux";
import login from "./login";
import dashboardControls from "./dashboardControls";
import mapControls from './mapControls';

export default combineReducers({
 login,
 dashboardControls,
 mapControls
});