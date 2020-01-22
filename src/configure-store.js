import { createStore } from "redux";

import rootReducer from './js/reducers/root-reducer';

// Replace redux compose with redux-devtools compose if it exists

const configureStore = (initialState = {}) => {

  const store = createStore(rootReducer,
    initialState
  );

  return store;
};

export default configureStore;