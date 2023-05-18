import { LOGOUT_USER, SET_CURRENT_USER,REFRESH_CURRENT_USER, USER_LOADING, SET_POINTS} from "./types";

// Initial store state
export const initialState = {
    isAuthenticated: false, // Is user logged in
    user: {}, // User's info (name, avatar, ...)
    loading: false,
    helperText: String, // Displayed when error found during sign up or sign in (requirements not met for field)
    isError: false,
    game: {}, // User's gamification info (points, badge, ...)
    errors: {} // Errors from API calls
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        // Set user upon login
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        // Get user's info
        case REFRESH_CURRENT_USER:
            return {
                ...state,
                user: action.payload                  
        };
        // Get gamification info of user
        case SET_POINTS:
            return {
                ...state,
                game: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        // Clear all user info upon logout
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: action.payload,
                game: action.payload
            };
        // Initial state is default
        default:
            return state;
    }
};

export default authReducer;
