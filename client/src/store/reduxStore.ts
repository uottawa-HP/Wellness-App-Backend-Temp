import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from 'redux-persist';
import thunk from "redux-thunk";

import rootReducer from "./root/reducers";

/* 
Redux thunk is middleware
Middleware allows writing of action creators that return function instead of action
Permits writing functions with logic inside that can interact with redux store dispatch and getState methods
*/
const middleware = [thunk];

// Save to local storage
const saveToLocalStorage = (state: any) => {
  try {
    // Save state that is in JSON format as string
    localStorage.setItem('state', JSON.stringify(state));
  } catch (err: any) {
    console.log(err);
  }
}

// Load from local storage
const loadFromLocalStorage = () => {
  try {
    // Serialize local state
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
}

/* 
Create redux store
Combo of root reducer, local storage and middleware which is thunk
*/
const store: any = createStore(
  rootReducer,
  loadFromLocalStorage(),
  compose(applyMiddleware(...middleware))
);
// Persist store from previous state in case app is exited
const persistor = persistStore(store);
// Dispatch latest state in case data persisted from before
store.subscribe(() => saveToLocalStorage(store.getState()));

export { store, persistor };
