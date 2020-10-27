import {
    SET_USER,
    GET_BEERS,
    SET_LOADING,
    SET_RANDOM_BEERS,
    SET_SEARCH_RESULTS,
    LOGOUT,
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

export const logout = () => (dispatch) => {
    window.localStorage.clear();
    dispatch({ type: LOGOUT });
};

export const register = (data) => (dispatch) => {
    const { username, email, password } = data;

    axios
        .post("http://localhost:5000/users/register", {
            username,
            email,
            password,
        })
        .then((res) => {
            //TODO - Validate email
            // dispatch({type:SET_USER, payload: res})
            // redirect: "login",
            // showError: false,
            // regErrors: {},
            // username: this.state.regUsername,
        })
        .then((res) => {
            axios
                .post("http://localhost:5000/users/login", {
                    username,
                    password,
                })
                .then((res) => {
                    console.log(res.data);
                    dispatch({ type: SET_USER, payload: res.data });
                });
        });
};

export const addBeer = (data) => (dispatch) => {
    const { username, beerData, brewery } = data;
    console.log(beerData);
    const postData = {
        id: beerData.id,
        username,
        beerName: beerData.beerName,
        abv: beerData.abv.toString(),
        beerDescription: beerData.beer_style,
        breweryName: beerData.brewery_name,
        breweryContact: beerData.breweryContact.url,
        stars: "1",
        date: new Date(),
        img: beerData.beer_label,
        beerInfo: beerData.beer_description,
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

export const rateBeer = (beerData, username, rating) => (dispatch) => {
    console.log(typeof rating);
    dispatch({ type: SET_LOADING, payload: true });
    let updateData = {
        beerData,
        username,
        newRating: rating,
    };
    axios
        .put(`http://localhost:5000/users/my-beers/update`, updateData)
        .then((res) => {
            dispatch({ type: GET_BEERS, payload: res.data });
            dispatch({ type: SET_LOADING, payload: false });
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
            const cleanData = response.data.response.beers.items.map((item) => {
                console.log(item);
                return {
                    id: item.beer.bid,
                    beerName: item.beer.beer_name,
                    abv: item.beer.beer_abv.toString(),
                    beerDescription: item.beer.beer_style,
                    breweryName: item.brewery.brewery_name,
                    breweryContact: item.brewery.contact,
                    img: item.beer.beer_label,
                    beerInfo: item.beer.beer_description,
                };
            });

            dispatch({ type: SET_LOADING, payload: false });
            dispatch({
                type: SET_SEARCH_RESULTS,
                payload: cleanData,
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

export const getRandomBeers = (beerType = "ipa") => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios
        .get(`https://api.untappd.com/v4/search/beer/?q=${beerType}`, {
            params: {
                client_id: "F94775549BAC795E436858A50A3616690D3CD446",
                client_secret: "844CF3E397DB0294FC89ACE34560918CAFD035FB",
            },
        })
        .then((res) => {
            const randomNum = () =>
                Math.floor(Math.random() * res.data.response.beers.count);

            const randomBeers = [];
            for (let i = 0; randomBeers.length < 5; i++) {
                let randomBeerData = res.data.response.beers.items[randomNum()];
                const cleanBeer = {
                    id: randomBeerData.beer.bid,
                    beerName: randomBeerData.beer.beer_name,
                    abv: randomBeerData.beer.beer_abv.toString(),
                    beerDescription: randomBeerData.beer.beer_style,
                    breweryName: randomBeerData.brewery.brewery_name,
                    breweryContact: randomBeerData.brewery.contact,
                    img: randomBeerData.beer.beer_label,
                    beerInfo: randomBeerData.beer.beer_description,
                };

                if (
                    !JSON.stringify(randomBeers).includes(
                        JSON.stringify(cleanBeer.id)
                    )
                ) {
                    randomBeers.push(cleanBeer);
                }
            }
            dispatch({ type: SET_LOADING, payload: false });
            dispatch({ type: SET_RANDOM_BEERS, payload: randomBeers });
        });
};
