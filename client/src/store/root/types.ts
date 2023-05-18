import rootReducer from './reducers';
// Initial state is just type rootReducer
type RootState = ReturnType<typeof rootReducer>;

export default RootState;
