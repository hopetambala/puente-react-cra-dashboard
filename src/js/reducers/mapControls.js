import { createAction, handleActions } from "redux-actions";
import { allRecordsByOrganization } from '../queries/records'

const defaultState = {
  query: allRecordsByOrganization,
  variables: {},
  mapType:"scatter"

};

// ACTIONS
const setQuery = createAction("SET_QUERY");
const setVariables = createAction("SET_VARIABLES");
const setMapType = createAction("SET_MAPTYPE");

const reducer = handleActions(
  {
    [setQuery]: (state, { payload }) => {
      console.log(payload)
      return  {
        ...state, 
        query:payload
      }
    },
    [setVariables]: (state, { payload }) => {
      console.log(payload);
      return  {
        ...state, 
        variables:payload.variables
      }
    },
    [setMapType]: (state, { payload }) => {
      console.log(payload);
      return  {
        ...state, 
        mapType:payload
      }
    },
   
  },
  defaultState
);

const getMapQueryInfo = (state) => state.mapControls;

export default reducer;
export { setQuery, setVariables, getMapQueryInfo, setMapType };