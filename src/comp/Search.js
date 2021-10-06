import React, { useState, useEffect } from "react";
import BeerRow from "./BeerRow";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import {
    searchBeer,
    getRandomBeers,
    sortSearchResults,
} from "../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import SortButton from "./SortButton";

const element = <FontAwesomeIcon icon={faSearch} />;
const Search = ({ user, sortSearchResults, searchBeer, getRandomBeers }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [orderAsc, setOrderAsc] = useState(false);
    const setOrder = (type) => {
        setOrderType(type);
        setOrderAsc(user.searchSortType.searchType == type ? !orderAsc : true);
    };
    const [hover, toggleHover] = useState("");
    const [orderType, setOrderType] = useState("");
    const center = { margin: "auto", height: 150, width: 200 };
    const [randomBeerData, setRandomBeerData] = useState([]);
    const [beerType, setBeerType] = useState(["ipa"]);
    // Beer Components

    const beers = user.searchResults
        ? user.searchResults.map((item) => {
              return <BeerRow search={true} beerData={item} />;
          })
        : [];

    useEffect(() => {
        getRandomBeers();
    }, []);
    useEffect(() => {
        setRandomBeerData(user.randomBeers);
    }, [user.randomBeers]);

    useEffect(() => {
        console.log(user.searchResults, orderType, orderAsc);
        sortSearchResults(user.searchResults, orderType, orderAsc);
    }, [orderType, orderAsc]);
    const sortTypes = [
        { name: "Beer", type: "beerName" },
        { name: "Brewer", type: "breweryName" },
        { name: "ABV", type: "abv" },
        { name: "Type", type: "beerDescription" },
    ];
    const checkHover = (type) => {
        return (hover == type && user.searchSortType.searchType !== type) ||
            user.searchSortType.searchType == type
            ? "black"
            : "gray";
    };
    // Brewery Components
    // const breweries = breweryData.map((item) => (
    //     <Brewery
    //         img={item.brewery.brewery_label}
    //         name={item.brewery.brewery_name}
    //         location={item.brewery.location.brewery_city}
    //         beerNum={item.brewery.beer_count}
    //     />
    // ));
    return (
        <div className="App">
            {/* Loaded  */}
            <>
                <div className="search-banner">
                    <div className="search-banner-content">
                        <h2>
                            Can't quite remember that awesome beer you had last
                            night? Bookmark it with BeerMe
                        </h2>

                        {/* Search Box */}
                        <label htmlFor="searchTerm">Search:</label>
                        <div className="row">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                name="searchTerm"
                            ></input>
                            <span
                                onClick={() => searchBeer(searchTerm)}
                                className="button"
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </div>
                </div>
                <br></br>
                {/* <label htmlFor="searchType">Beer: 
                        <input name="searchType" type="radio" value="beer" onChange={this.handleChange}></input>
                    </label>
                    <label htmlFor="searchType">Brewery: 
                        <input name="searchType" type="radio" value="brewery" onChange={this.handleChange}></input>
                    </label> */}
                {/* Random Beers Container */} {/* Loading animation */}
                {user.loading && (
                    <ReactLoading style={center} type="bubbles" color="blue" />
                )}
                {beers.length == 0 &&
                    user.searchResults.length == 0 &&
                    !user.loading && (
                        <div
                            className={
                                user.colorScheme !== "dark"
                                    ? "beers-cont"
                                    : "beers-cont dark-theme-secondary"
                            }
                        >
                            <h2>Random Beers</h2>

                            {randomBeerData.map((beer) => {
                                return (
                                    <BeerRow search={true} beerData={beer} />
                                );
                            })}
                        </div>
                    )}
                {/* Beer Container */}
                {!user.loading &&
                    user.searchResults &&
                    user.searchResults.length > 0 && (
                        <>
                            <h2>Results</h2>
                            <div
                                className={
                                    user.colorScheme !== "dark"
                                        ? "beers-cont"
                                        : "beers-cont dark-theme-secondary"
                                }
                            >
                                <div
                                    className={
                                        user.colorScheme !== "dark"
                                            ? "sort-btn-group sort-btns-light"
                                            : "sort-btn-group sort-btns-dark"
                                    }
                                >
                                    <span className="blank-col"></span>
                                    {sortTypes.map((sortType) => (
                                        <SortButton
                                            name={sortType.name}
                                            sortType={sortType.type}
                                            toggleHover={toggleHover}
                                            checkHover={checkHover}
                                            setOrder={setOrder}
                                        />
                                    ))}
                                </div>

                                {beers}
                            </div>
                        </>
                    )}
            </>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    searchBeer,
    getRandomBeers,
    sortSearchResults,
};

export default connect(mapStateToProps, mapActionsToProps)(Search);
