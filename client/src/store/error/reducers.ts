import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// Initial state is blank because there are no errors
export const initialState = {};

const errorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Set errors based on API call response
    case GET_ERRORS:
      return action.payload;
    // Reset to default state
    case CLEAR_ERRORS:
      return state;
    // Default is blank state
    default:
      return state;
  }
};
// Error reducer
export default errorReducer;
