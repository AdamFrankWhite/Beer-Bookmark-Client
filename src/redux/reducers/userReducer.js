import {
    GET_BEERS,
    SET_USER,
    SET_LOADING,
    SET_RANDOM_BEERS,
    SET_SEARCH_RESULTS,
    LOGOUT,
    SORT_MY_BEERS,
    SET_SORT_TYPE,
    SET_SEARCH_SORT_TYPE,
    SORT_SEARCH_RESULTS,
    RESET_EMAIL_MESSAGE,
    UPDATE_EMAIL,
    SHOW_MODAL,
    ADD_GROUP,
    //
    SET_AUTHENTICATION,
    SET_UNAUTHENTICATED,
    CLEAR_ERRORS,
    SET_ERRORS,
    GET_USER_MESSAGES,
    GET_ALL_USERS,
    SET_COLOR_SCHEME,
    SET_BREWERY,
} from "../types";

const initialState = {
    beers: [],
    loading: false,
    searchResults: [],
    randomBeers: [],
    sortedBeers: [],
    sortType: {},
    searchSortType: { searchType: "", orderAsc: false },
    colorScheme: "",
    resetEmailMessage: null,
    //
    authenticated: false,
    token: "",
    userData: {},
    loggedIn: false,
    showModal: false,
    messages: [],
    users: [],
    beerGroups: [],
};

//NOTE - if dispatch is called without case for it, it will use default and reset state between dispatches
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            console.log(action.payload);
            return {
                ...state,
                sortType: {},
                beers: action.payload.beers,
                userData: action.payload,
                loggedIn: true,
                colorScheme: action.payload.theme,
                searchResults: [],
                showModal: false,
                randomBeers: [],
                searchSortType: {},
                beerGroups: action.payload.beerGroups,
            };
        case SHOW_MODAL:
            return {
                ...state,
                showModal: action.payload.visibility,
                addBeerData: action.payload.addBeerData || {},
            };
        case ADD_GROUP:
            return {
                ...state,
                beerGroups: action.payload,
            };
        case GET_BEERS:
            return {
                ...state,
                beers: action.payload,
            };
        case SET_BREWERY:
            return {
                ...state,
                brewery: action.payload,
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
        case UPDATE_EMAIL: {
            return {
                ...state,
                userData: action.payload,
            };
        }
        case RESET_EMAIL_MESSAGE: {
            return {
                ...state,
                resetEmailMessage: action.payload,
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
        case SET_SEARCH_SORT_TYPE: {
            return {
                ...state,
                searchSortType: action.payload,
            };
        }
        case SET_COLOR_SCHEME: {
            return {
                ...state,
                colorScheme: action.payload,
            };
        }

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
