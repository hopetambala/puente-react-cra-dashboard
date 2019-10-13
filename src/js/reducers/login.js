import { createAction, handleActions } from "redux-actions";

const defaultState = {
  username:"",
  email:"",
  firstName:"",
  lastName:"",
  role:"",
  organization:"",
  isAuthenticated: false,
  admin:false
};

// ACTIONS

const setProfile = createAction("SET_PROFILE");
const setAuth = createAction("SET_AUTHENTICATION")

const reducer = handleActions(
  {
    [setProfile]: (state, { payload }) => {
      console.log(payload)
      return  {
        ...state, 
        username: payload.username,
        email:payload.email,
        firstName:payload.first_name,
        lastName: payload.last_name,
        role: payload.role,
        organization:payload.organization
      }
    },
    [setAuth]: (state, { payload }) => {
        if (payload === true){
            return { ...state, isAuthenticated:true }; 
        }
        else{
            return { ...state, isAuthenticated:false }; 
        }  
    },
  },
  defaultState
);

const getAuthInfo = (state) => state.login;

export default reducer;
export { setProfile, setAuth, getAuthInfo };