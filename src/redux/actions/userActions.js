import {
    SET_USER,
    GET_BEERS,
    SET_LOADING,
    SET_SEARCH_RESULTS,
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

export const login = (loginData) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios
        .post(`http://localhost:5000/users/login`, loginData)
        .then((res) => {
            console.log(res.data);
            dispatch({ type: SET_USER, payload: res.data });
            // dispatch({ type: GET_BEERS, payload: res.data });
            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((err) => {
            //dispatch error
        });
};

export const addBeer = (data) => (dispatch) => {
    const { username, beerData, brewery } = data;
    const postData = {
        id: beerData.bid,
        username,
        beerName: beerData.beer_name,
        abv: beerData.beer_abv.toString(),
        beerDescription: beerData.beer_style,
        brewery: brewery,
        stars: "1",
        date: new Date(),
        img: beerData.beer_label,
    };
    console.log(postData);
    axios
        .post("http://localhost:5000/users/my-beers/add", postData)
        .then((res) => {
            dispatch({ type: GET_BEERS, payload: res.data });
            console.log(res.data);
        });
};
export const deleteBeer = (data) => (dispatch) => {
    const { username, beerData } = data;
    let deleteData = {
        beerData,
        username,
    };
    console.log(deleteData);
    axios
        .put("http://localhost:5000/users/my-beers/delete-beer", deleteData)
        .then((res) => {
            dispatch({ type: GET_BEERS, payload: res.data });
        });
};

export const searchBeer = (searchTerm, searchType = "beer") => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios
        .get(
            `https://api.untappd.com/v4/search/${searchType}?q=${searchTerm}`,
            {
                params: {
                    client_id: "F94775549BAC795E436858A50A3616690D3CD446",
                    client_secret: "844CF3E397DB0294FC89ACE34560918CAFD035FB",
                },
            }
        )
        .then((response) => {
            dispatch({ type: SET_LOADING, payload: false });
            dispatch({
                type: SET_SEARCH_RESULTS,
                payload: response.data.response.beers.items,
            });
            // searchType === "beer" &&
            //     this.setState({
            //         beerData: response.data.response.beers.items,
            //         isLoading: false,
            //     });
            // searchType === "brewery" &&
            //     this.setState({
            //         breweryData: response.data.response.brewery.items,
            //     });
            // console.log(this.state.beerData);
        });
};
