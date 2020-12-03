import {
    SET_USER,
    GET_BEERS,
    SET_LOADING,
    SET_RANDOM_BEERS,
    SET_SEARCH_RESULTS,
    LOGOUT,
    SORT_MY_BEERS,
    SET_SORT_TYPE,
    SET_SEARCH_SORT_TYPE,
    SORT_SEARCH_RESULTS,
    SET_COLOR_SCHEME,
    RESET_EMAIL_MESSAGE,
    UPDATE_EMAIL,
    SHOW_MODAL,
    ADD_GROUP,
    SET_BREWERY,
    SET_BREWER_BEERS,
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
            console.log(err);
            dispatch({ type: SET_LOADING, payload: false });
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

export const changeEmail = (username, email) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    console.log(username);
    axios
        .put("http://localhost:5000/users/email", { username, email })
        .then((res) => {
            console.log(res.data);
            dispatch({ type: UPDATE_EMAIL, payload: res.data });
            dispatch({ type: SET_LOADING, payload: false });
        });
};
export const resetPassword = (email) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios
        .post("http://localhost:5000/users/forgot", { email })
        .then((res) => {
            console.log(res.data);
            res.data.sent
                ? dispatch({ type: RESET_EMAIL_MESSAGE, payload: "Reset Sent" })
                : dispatch({
                      type: RESET_EMAIL_MESSAGE,
                      payload: "Email not found",
                  });
            console.log("yo");
            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((err) => console.log(err));
};

export const changePassword = (username, oldPassword, newPassword) => (
    dispatch
) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios
        .put("http://localhost:5000/users/change-password", {
            username,
            oldPassword,
            newPassword,
        })
        .then((res) => {
            console.log(res.data);
            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((err) => console.log(err));
};

export const addBeer = (data) => (dispatch) => {
    const { username, beerData, beerGroup } = data;
    console.log(beerData);
    const postData = {
        id: beerData.id,
        username,
        beerName: beerData.beerName,
        abv: beerData.abv.toString(),
        beerDescription: beerData.beerDescription,
        breweryName: beerData.breweryName,
        brewery: beerData.brewery,
        stars: "1",
        date: new Date(),
        img: beerData.img,
        beerInfo: beerData.beerInfo,
        beerGroup,
    };
    console.log(postData);
    axios
        .post("http://localhost:5000/users/my-beers/add", postData)
        .then((res) => {
            dispatch({ type: GET_BEERS, payload: res.data });
            dispatch({ type: SHOW_MODAL, payload: false });
            console.log(res.data);
        })
        .catch((err) => console.log(err));
};

export const addNewGroup = (username, newGroup) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios
        .post("http://localhost:5000/users/my-beers/add-group", {
            username,
            newGroup,
        })
        .then((res) => {
            console.log(res.data);
            if (res.data.error) {
                //deal with error
                console.log(res.data.error);
            } else {
                const updatedGroups = res.data;
                dispatch({ type: ADD_GROUP, payload: updatedGroups });
            }

            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((err) => console.log(err));
};
export const deleteBeer = (data, currentSortType) => (dispatch) => {
    const { username, beerData } = data;
    let deleteData = {
        beerData,
        username,
    };
    console.log(deleteData);
    axios
        .put("http://localhost:5000/users/my-beers/delete-beer", deleteData)
        .then((res) => {
            const sortedBeers = sortBeersFunc(
                res.data,
                currentSortType.searchType,
                currentSortType.orderAsc
            );
            dispatch({ type: GET_BEERS, payload: res.data });
            // Necessary to avoid sorting bug - state.sortType kept getting overwritten on second rating
            dispatch({
                type: SET_SORT_TYPE,
                payload: {
                    searchType: currentSortType.searchType,
                    orderAsc: currentSortType.orderAsc,
                },
            });
            currentSortType.searchType == "stars" &&
                dispatch({ type: SORT_MY_BEERS, payload: sortedBeers });
            dispatch({ type: SET_LOADING, payload: false });
        });
};

export const rateBeer = (
    beerData,
    username,
    rating,
    currentSortType,
    currentBeerList
) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    let updateData = {
        beerData,
        username,
        newRating: rating,
    };

    axios
        .put(`http://localhost:5000/users/my-beers/update`, updateData)
        .then((res) => {
            //Handle list update client side using current list, to avoid list re-ordering issues
            let updatedBeer = res.data;
            //Remove beer to be edited
            let updatedBeerList = currentBeerList.filter(
                (beer) => beer.id != updatedBeer.id
            );

            let index = currentBeerList.findIndex(
                (beer) => beer.id === updatedBeer.id
            );

            //Insert updated beer
            updatedBeerList.splice(index, 0, updatedBeer);
            const sortedBeers = sortBeersFunc(
                updatedBeerList,
                currentSortType.searchType,
                currentSortType.orderAsc
            );
            console.log(currentSortType);
            if (currentSortType !== undefined) {
                dispatch({ type: GET_BEERS, payload: sortedBeers });
                console.log("boo");
            } else {
                dispatch({ type: GET_BEERS, payload: updatedBeerList });
            }

            // Necessary to avoid sorting bug - state.sortType kept getting overwritten on second rating
            dispatch({
                type: SET_SORT_TYPE,
                payload: {
                    searchType: currentSortType.searchType,
                    orderAsc: currentSortType.orderAsc,
                },
            });
            currentSortType.searchType == "stars" &&
                dispatch({ type: SORT_MY_BEERS, payload: sortedBeers });
            dispatch({ type: SET_LOADING, payload: false });
        })
        .catch((err) => {
            console.log(err);
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
                    abv: item.beer.beer_abv,
                    beerDescription: item.beer.beer_style,
                    breweryName: item.brewery.brewery_name,
                    brewery: item.brewery,
                    img: item.beer.beer_label,
                    beerInfo: item.beer.beer_description,
                };
            });

            dispatch({ type: SET_LOADING, payload: false });
            //reset ordering
            dispatch({ type: SET_SEARCH_SORT_TYPE, payload: {} });
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

export const setBrewerBeers = (beers) => (dispatch) => {
    dispatch({ type: SET_BREWER_BEERS, payload: beers });
};
export const sortBeers = (beers, searchType, orderAsc) => (dispatch) => {
    let sortedBeers;

    if (orderAsc) {
        sortedBeers = beers.sort((a, b) =>
            a[searchType] > b[searchType]
                ? 1
                : b[searchType] > a[searchType]
                ? -1
                : 0
        );
    } else {
        sortedBeers = beers.sort((a, b) =>
            a[searchType] < b[searchType]
                ? 1
                : b[searchType] < a[searchType]
                ? -1
                : 0
        );
    }
    dispatch({ type: SET_SORT_TYPE, payload: { searchType, orderAsc } });
    dispatch({ type: SORT_MY_BEERS, payload: sortedBeers });
    // setSortedBeers(
    //     sortedBeers.map((beer) => (
    //         <BeerRow myBeers={true} beerData={beer} brewery={beer.brewery} />
    //     ))
    // );
};

export const setBrewery = (breweryData) => (dispatch) => {
    dispatch({ type: SET_BREWERY, payload: breweryData });
};
export const sortBeersByGroup = (allBeers, beerGroup) => (dispatch) => {
    const filteredBeers = allBeers.filter(
        (beer) => beer.beerGroup == beerGroup
    );
    if (beerGroup) {
        dispatch({ type: SORT_MY_BEERS, payload: filteredBeers });
    } else {
        dispatch({ type: SORT_MY_BEERS, payload: allBeers });
    }
};
export const sortSearchResults = (beers, searchType, orderAsc) => (
    dispatch
) => {
    console.log(searchType);
    if (!beers) {
        return [];
    }
    let sortedBeers;

    if (orderAsc) {
        sortedBeers = beers.sort((a, b) =>
            a[searchType] > b[searchType]
                ? 1
                : b[searchType] > a[searchType]
                ? -1
                : 0
        );
    } else {
        sortedBeers = beers.sort((a, b) =>
            a[searchType] < b[searchType]
                ? 1
                : b[searchType] < a[searchType]
                ? -1
                : 0
        );
    }
    dispatch({ type: SET_SEARCH_SORT_TYPE, payload: { searchType, orderAsc } });
    dispatch({ type: SORT_SEARCH_RESULTS, payload: sortedBeers });
};

export const toggleModal = (visibility, addBeerData) => (dispatch) => {
    dispatch({ type: SHOW_MODAL, payload: { visibility, addBeerData } });
};
export const setColorScheme = (username, color) => (dispatch) => {
    console.log(username, color);
    axios
        .put("http://localhost:5000/users/set-theme", { username, color })
        .then((res) => {
            console.log(res);
            dispatch({ type: SET_COLOR_SCHEME, payload: color });
        });
};

const sortBeersFunc = (beers, searchType, orderAsc) => {
    let sortedBeers;

    if (orderAsc) {
        sortedBeers = beers.sort((a, b) =>
            a[searchType] > b[searchType]
                ? 1
                : b[searchType] > a[searchType]
                ? -1
                : 0
        );
    } else {
        sortedBeers = beers.sort((a, b) =>
            a[searchType] < b[searchType]
                ? 1
                : b[searchType] < a[searchType]
                ? -1
                : 0
        );
    }
    return sortedBeers;
};
