import {
    GET_BEERS,
    SET_USER,
    SET_LOADING,
    SET_RANDOM_BEERS,
    SET_SEARCH_RESULTS,
    LOGOUT,
    SORT_MY_BEERS,
    SET_SORT_TYPE,
    //
    SET_AUTHENTICATION,
    SET_UNAUTHENTICATED,
    CLEAR_ERRORS,
    SET_ERRORS,
    GET_USER_MESSAGES,
    GET_ALL_USERS,
} from "../types";

const initialState = {
    beers: [],
    loading: false,
    searchResults: [],
    randomBeers: [],
    sortedBeers: [],
    sortType: {},
    //
    authenticated: false,
    token: "",
    userData: {},
    loggedIn: false,

    messages: [],
    users: [],
};

//NOTE - if dispatch is called without case for it, it will use default and reset state between dispatches
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            console.log(action.payload);
            return {
                ...state,
                beers: action.payload.beers,
                userData: action.payload,
                loggedIn: true,
            };
        case GET_BEERS:
            return {
                ...state,
                beers: action.payload,
            };
        case SORT_MY_BEERS: {
            return {
                ...state,
                sortedBeers: action.payload,
            };
        }
        case SET_SORT_TYPE: {
            return {
                ...state,
                sortType: action.payload,
            };
        }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_RANDOM_BEERS:
            return {
                ...state,
                randomBeers: action.payload,
            };
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload,
            };
        case LOGOUT: {
            return {
                initialState,
            };
        }
        case SET_AUTHENTICATION:
            return {
                ...state,
                authenticated: true,
                loggedIn: true,
                token: action.payload,
            };
        case SET_UNAUTHENTICATED:
            return initialState;

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
