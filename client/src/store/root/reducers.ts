import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "../auth/reducers";
import errorReducer from "../error/reducers";
import languageReducer from "../language/reducers";

/* 
Persist state even after app is closed using async storage
This is so the user does not have to login every time they open the app
*/
const persistConfig = {
  key: 'state',
  storage: AsyncStorage
};

// Root reducer is combo of auth and error reducers
const rootReducer = combineReducers({
  /* 
    persistReducer uses persistConfig to get existing state so the information from the redux store is synchronized in case the app was closed
    Prevents login requirement until user lgos out manually 
  */
  auth: persistReducer(persistConfig, authReducer),
  errors: persistReducer(persistConfig, errorReducer),
  language: persistReducer(persistConfig,languageReducer)
});
// Create root reducer
export default rootReducer;
