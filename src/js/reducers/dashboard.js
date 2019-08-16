import { createAction, handleActions } from "redux-actions";

const defaultState = {
  model:"",
  filters: {
    community:"",

  }

};

// ACTIONS

const setModel = createAction("SET_MODEL");
const setFilters = createAction("SET_FILTERS")

const reducer = handleActions(
  {
    [setModel]: (state, { payload }) => {
      console.log(payload)
      return  {
        ...state, 
        /*username: payload.username,
        email:payload.email,
        firstName:payload.first_name,
        lastName: payload.last_name,
        role: payload.role,
        organization:payload.organization*/
      }
    },
    [setFilters]: (state, { payload }) => {
        /*if (payload === true){
            return { ...state, isAuthenticated:true }; 
        }
        else{
            return { ...state, isAuthenticated:false }; 
        }  */
    },
  },
  defaultState
);

const getFiltersInfo = (state) => state.login.filters;

export default reducer;
export { setModel, setFilters, getFiltersInfo };