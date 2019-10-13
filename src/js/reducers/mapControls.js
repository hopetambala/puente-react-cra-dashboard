import { createAction, handleActions } from "redux-actions";

const defaultState = {
  model:"",
  sex:"",
  education:""

};

// ACTIONS

const setModel = createAction("SET_MODEL");
const setSex = createAction("SET_SEX");
const setEducation = createAction("SET_EDUCATION");

const reducer = handleActions(
  {
    [setModel]: (state, { payload }) => {
      console.log(payload)
      return  {
        ...state, 
        model:payload.model
      }
    },
    [setSex]: (state, { payload }) => {
      console.log(payload);
      return  {
        ...state, 
        sex:payload
      }
    },
    [setEducation]: (state, { payload }) => {
      console.log(payload);
      return  {
        ...state, 
        education:payload
      }
    },
  },
  defaultState
);

const getMapFiltersInfo = (state) => state.mapControls;

export default reducer;
export { setModel, setSex, setEducation, getMapFiltersInfo };