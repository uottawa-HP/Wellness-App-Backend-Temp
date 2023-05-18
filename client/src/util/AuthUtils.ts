import axios from "axios";

// Auth token is so user remains logged in and so the backend knows that calls made are authorized
const setAuthToken = (token: any) => {
    if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

const AuthUtils = { setAuthToken: setAuthToken };

export default AuthUtils;
