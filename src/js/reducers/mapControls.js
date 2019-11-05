import { createAction, handleActions } from "redux-actions";
import { allRecordsByOrganization } from '../queries/records'

const defaultState = {
  query: allRecordsByOrganization,
  variables: {}

};

// ACTIONS
const setQuery = createAction("SET_QUERY");
const setVariables = createAction("SET_VARIABLES");
// const setMapType = createAction("SET_MAPTYPE");

const reducer = handleActions(
  {
    [setQuery]: (state, { payload }) => {
      console.log(payload)
      return  {
        ...state, 
        query:payload.query
      }
    },
    [setVariables]: (state, { payload }) => {
      console.log(payload);
      return  {
        ...state, 
        variables:payload
      }
    },
   
  },
  defaultState
);

const getMapQueryInfo = (state) => state.mapControls;

export default reducer;
export { setQuery, setVariables, getMapQueryInfo };