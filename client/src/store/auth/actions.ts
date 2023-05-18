import axios, { AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";

import util from "../../util";
import { authAPI, gameAPI } from '../../api';

import { GET_ERRORS, SET_CURRENT_USER,REFRESH_CURRENT_USER, USER_LOADING, LOGOUT_USER, SET_POINTS} from "./types";
import { store } from "../reduxStore";
import { Schema } from "inspector";
import Points from "../../constants/Points";
import LanguageActions from "../language/actions";
import { rejects } from "assert";

const loginSSO = (data: Object) =>{
    return new Promise((resolve,reject) =>{
        axios.post(authAPI.loginSSO,data).then((response: AxiosResponse) => {
            // Set current user
            store.dispatch({
                type: SET_CURRENT_USER,
                payload: response.data
            });
            // Clear errors in store
            store.dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            resolve(response);
        })
        .catch((err: any) => {
            console.log("An error occured when dispatchng the user's info to the store.")
            // Save response error data in store
            const payload = err.response.data;
            store.dispatch({
                type: GET_ERRORS,
                payload: payload
            });
            reject(payload);
        
        });
    })
}
const logout = () => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    util.AuthUtils.setAuthToken(false);
    store.dispatch({
        type: GET_ERRORS,
        payload: {}
    });
    // Set current user to empty object {} which will set isAuthenticated to false
    store.dispatch({
        type: LOGOUT_USER,
        payload: {}
    });
};

// Updates the personnal information of the user 
const updateUser = (userData: Object) => {
    return new Promise((resolve, reject) => {
        const userId = store.getState().auth.user._id;
        axios.patch(authAPI.updateUser + userId, userData)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    resolve(response);
                } else {
                    reject(response.status);
                }
            })
            .catch((err: any) => {
                const payload = err.response.data;
                store.dispatch({
                    type: GET_ERRORS,
                    payload: payload
                });
                reject(payload);
            });
    });
};

const updateStore = () =>{
    //refreshing the gamification values
    getGameInfo();
    //refreshing the user's info values
    getUserInfo();
}

//Returns the user info of the user (after fetching them on the database)

const getUserInfo = () => {
   
    return new Promise((resolve, reject) => {
        var userId = store.getState().auth.user._id;
        axios.get(authAPI.getUser + userId)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    store.dispatch({
                        type: REFRESH_CURRENT_USER,
                        payload: response.data
                    });
                    store.dispatch({
                        type: GET_ERRORS,
                        payload: {}
                    });
                    resolve(response);
                } else {
                    reject(response.status);
                }
            })
            .catch((err: any) => {
                const payload = err.response.data;
                store.dispatch({
                    type: GET_ERRORS,
                    payload: payload
                });
                reject(payload);
            });
    });
};

// Returns the gamification info of the user (after fetching them on the database)
const getGameInfo = () => {
    
    return new Promise((resolve, reject) => {
        var userId = store.getState().auth.user._id;
        userId = userId.toString();
        axios.get(gameAPI.getGame + userId)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    store.dispatch({
                        type: SET_POINTS,
                        payload: response.data
                    });
                    store.dispatch({
                        type: GET_ERRORS,
                        payload: {}
                    });
                    resolve(response);
                } else {
                    reject(response.status);
                }
            })
            .catch((err: any) => {
                const payload = err.response.data;
                store.dispatch({
                    type: GET_ERRORS,
                    payload: payload
                });
                reject(payload);
            });
        });
};

// Updates the game info of the user after a chnage in the redux store values
const updateGameInfo = (userData: Object) => {
    return new Promise((resolve, reject) => {
        var gameId = store.getState().auth.game.gamificationId;
        axios.patch(gameAPI.updateGame + gameId, userData)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    resolve(response);
                } else {
                    reject(response.status);
                }
            })
            .catch((err: any) => {
                const payload = err.response.data;
                store.dispatch({
                    type: GET_ERRORS,
                    payload: payload
                });
                reject(payload);
            });
    });
};

//setting the language of the app


// Adding points to the user 
const addPoints = (n: number) => {
    // Update points in store
    store.getState().auth.game.points += n;
    let updatedGame = store.getState().auth.game;
    // Perform set points action, update it on database
    store.dispatch({
        type: 'SET_POINTS',
        payload: updatedGame
    });
    toast.show((LanguageActions.getLanguage()==='english'? "You earned " : "Vous avez gagné " )+ n.toString() + " point" + (n === 1 ? "" : "s") + "!");
    // Update info in database and sync with store
    updateGameInfo(store.getState().auth.game);
}

// Set the specified boolean value in argument to the value eneter in argument 
const setBooleanValue = (name: string, value: boolean) => {
    switch (name) {
        case 'eventShared':
            store.getState().auth.game.eventShared = value;
            break;
        case 'wellnessTipShared':
            store.getState().auth.game.wellnessTipShared = value;
            break;
        case 'dailyStreakCompleted':
            store.getState().auth.game.dailyStreakCompleted = value;
            break;
        case 'notificationActivated':
            store.getState().auth.game.notificationActivated = value;
            break;
        case 'blogPostRated':
            store.getState().auth.game.blogPostRated = value;
            break;
        case 'journalUsed':
            store.getState().auth.game.journalUsed = value;
            break;
        case 'avatarCreated':
            store.getState().auth.game.avatarCreated = value;
            break;
        case 'serviceBooked':
            store.getState().auth.game.serviceBooked = value;

            break;
    }
    // Get current/latest gamification info from store
    let updatedGame = store.getState().auth.game;
    store.dispatch({
        type: 'SET_POINTS',
        payload: updatedGame
    });
    // Sync database with latest store info
    updateGameInfo(store.getState().auth.game);
}

//reset the log in date of the user to today 
const resetLastLoginDate = (date: Date) => {
    store.getState().auth.game.lastLoginDate = date;
    // Sync database with store
    updateGameInfo(store.getState().auth.game);
}

//returns the badge of a user 
const getBadgeName = () => {
    let points = store.getState().auth.game.points;
    let badgeName;
    // Badge if points are equal or greater than set benchmarks
    if (points >= Points.diamond) {
        badgeName = 'Diamond';
    }
    else if (points >= Points.platinum) {
        badgeName = 'Platinum';
    }
    else if (points >= Points.gold) {
        badgeName = 'Gold';
    }
    else if (points >= Points.silver) {
        badgeName = 'Silver';
    }
    else if (points >= Points.bronze){
        badgeName = 'Bronze';
    } else { // No badge for user if less points than bronze min. value
        badgeName = '';
    }
    return badgeName;
}

const isUserLoggedIn = () => {
    return store.getState().auth.isAuthenticated;
}

const AuthActions = {
    loginSSO,
    logout,
    updateUser,
    getGameInfo,
    updateGameInfo,
    addPoints,
    setBooleanValue,
    resetLastLoginDate,
    getBadgeName,
    updateStore,
    getUserInfo,
    isUserLoggedIn,
}
// Auth reducer
export default AuthActions;
