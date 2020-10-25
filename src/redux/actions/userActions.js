import {
    SET_USER,
    GET_BEERS,
    SET_AUTHENTICATION,
    SET_UNAUTHENTICATED,
    GET_USER_MESSAGES,
    GET_ALL_USERS,
    CLEAR_ERRORS,
    SET_ERRORS,
} from "../types";
import axios from "axios";

export const getBeers = (username) => (dispatch) => {
    console.log(username);
    axios
        .get(`http://localhost:5000/users/my-beers/${username}`)
        .then((res) => {
            dispatch({ type: GET_BEERS, payload: res.data });
            console.log(res);
        });
};

export const login = (username) => (dispatch) => {
    axios.get(`http://localhost:5000/users/${username}`).then((res) => {
        dispatch({ type: SET_USER, payload: res.data });
        console.log(res);
    });
};
