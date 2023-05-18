// We pass in a state, which is empty by default
// and an action which we will learn about in the 
// actions file


const initialState = {
  complete:false,
  label:'english'

}
const languageReducer = (state = initialState, action: { type: any; languagePreference: any; }) => {
  // Clone state object
  let newState = Object.assign({}, state);
  // Look for type set in the actions file
  // these types should be as unique as possible
  switch (action.type) {
    case "LANGUAGE_CHANGED":
      // Payload is set in the actions file
      return Object.assign({}, state, {label: action.languagePreference })

    default:
      return state;
  }
};

export default languageReducer;