import {
    GET_BEERS,
    SET_USER,
    SET_AUTHENTICATION,
    SET_UNAUTHENTICATED,
    CLEAR_ERRORS,
    SET_ERRORS,
    GET_USER_MESSAGES,
    GET_ALL_USERS,
} from "../types";

const initialState = {
    beers: [],
    //
    authenticated: false,
    token: "",
    userData: {},
    loggedIn: false,
    loading: false,
    messages: [],
    users: [],
};

//NOTE - if dispatch is called without case for it, it will use default and reset state between dispatches
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BEERS:
            return {
                ...state,
                beers: action.payload,
            };

        case SET_AUTHENTICATION:
            return {
                ...state,
                authenticated: true,
                loggedIn: true,
                token: action.payload,
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...state,
                userData: action.payload,
            };
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case GET_USER_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            };

        default:
            return { ...state };
    }
}
