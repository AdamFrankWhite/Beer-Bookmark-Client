import {
    SET_USER,
    SET_AUTHENTICATION,
    SET_UNAUTHENTICATED,
    LOADING_UI,
    GET_USER_MESSAGES,
    GET_ALL_USERS,
    CLEAR_ERRORS,
    SET_ERRORS,
} from "../types";
import axios from "axios";

export const signupUser = (userData) => (dispatch) => {
    axios.post("http://localhost:5000/users/signup", userData).then((res) => {
        console.log(res);
        // dispatch(
        //   loginUser({ username: userData.username, password: userData.password })
        // );
    });
};
export const loginUser = (userData) => (dispatch) => {
    // dispatch({ type: LOADING_UI, payload: true });
    axios
        .post("http://localhost:5000/users/login", userData)
        .then((res) => {
            if (res.data.token) {
                console.log("Successful login");
                dispatch({ type: SET_AUTHENTICATION, payload: res.data.token });

                dispatch(getAllUsers());
                // dispatch({ type: CLEAR_ERRORS });
                window.localStorage.setItem("access_token", res.data.token);
                dispatch(getUserData());

                // dispatch({ type: LOADING_UI, payload: false });

                // history.push(`/dashboard`);
            } else if (res.data.status === 401) {
                console.log("Username/password incorrect");
            }
        })
        .catch((err) => {
            // dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
};

export const getUserData = () => (dispatch) => {
    dispatch(getUserMessages());
    console.log(window.localStorage.getItem("access_token"));
    axios
        .get("http://localhost:5000/users/profile/get", {
            headers: {
                Authorization: window.localStorage.getItem("access_token"),
            },
            //try removing header here, as think is set above
        })
        .then((res) => {
            dispatch({ type: SET_USER, payload: res.data });
        });
};

export const getUserMessages = () => (dispatch) => {
    axios
        .get("http://localhost:5000/messages/get", {
            headers: {
                Authorization: window.localStorage.getItem("access_token"),
            },
        })
        .then((res) => {
            dispatch({ type: GET_USER_MESSAGES, payload: res.data });
        });
};

export const getAllUsers = () => (dispatch) => {
    axios
        .get("http://localhost:5000/users/", {
            headers: {
                Authorization: window.localStorage.getItem("access_token"),
            },
        })
        .then((res) => {
            dispatch({ type: GET_ALL_USERS, payload: res.data });
        });
};
export const authenticateUserOnRefresh = () => (dispatch) => {
    dispatch({ type: LOADING_UI, payload: true });
    dispatch({
        type: SET_AUTHENTICATION,
        payload: window.localStorage.getItem("access_token"),
    });
    dispatch(getUserData());
    dispatch(getAllUsers());
    // dispatch({ type: LOADING_UI, payload: false });
};

export const logOut = () => (dispatch) => {
    dispatch({ type: SET_UNAUTHENTICATED });
    window.localStorage.clear();
};

export const uploadImage = (formData, file) => (dispatch) => {
    console.log(file);

    // dispatch({ type: LOADING_UI });

    axios
        .post("http://localhost:5000/users/profile/upload", formData, {
            headers: {
                Authorization: window.localStorage.getItem("access_token"),
            },
        })
        .then((res) => {
            let user = res.data.user;
            // update profile image property
            user.profile.profileImageUrl = res.data.clientFileUrl;
            //update appstate
            dispatch({ type: SET_USER, payload: user });
        })
        .catch((err) => console.log(err));
};

export const sendMessage = (recipient, sender, message) => (dispatch) => {
    const messageData = {
        sender,
        receiver: recipient,
        message,
        parents: [],
    };
    console.log(messageData);
    axios
        .post("http://localhost:5000/messages/send", messageData, {
            headers: {
                Authorization: window.localStorage.getItem("access_token"),
            },
        })
        .then((res) => {
            console.log(res.data);
        });
};
