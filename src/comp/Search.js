import React, { useState, useEffect } from "react";
import BeerRow from "./BeerRow";
import Brewery from "./Brewery";
import axios from "axios";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import {
    searchBeer,
    getRandomBeers,
    sortSearchResults,
} from "../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons/faSortAlphaDown";
import { faSortAlphaUp } from "@fortawesome/free-solid-svg-icons/faSortAlphaUp";

const element = <FontAwesomeIcon icon={faSearch} />;
function Search(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [orderAsc, setOrderAsc] = useState(false);

    const [hover, toggleHover] = useState({
        name: false,
        brewery: false,
        type: false,
        abv: false,
    });
    const [orderType, setOrderType] = useState("");
    const center = { margin: "auto", height: 150, width: 200 };
    const [randomBeerData, setRandomBeerData] = useState(
        props.user.randomBeers
    );
    const [beerType, setBeerType] = useState(["ipa"]);
    // Beer Components

    const beers = props.user.searchResults
        ? props.user.searchResults.map((item) => {
              return <BeerRow search={true} beerData={item} />;
          })
        : [];
    useEffect(() => {
        // https://api.untappd.com/v4/search/beer/?q=${beerType}

        !props.user.searchResults && props.getRandomBeers();
    }, []);
    // useEffect(() => {
    //     props.sortSearchResults(props.user.searchResults, orderType, orderAsc);
    // }, [props.user.searchResults]);
    useEffect(() => {
        props.sortSearchResults(props.user.searchResults, orderType, orderAsc);
    }, [orderType, orderAsc]);
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
                                onClick={() => props.searchBeer(searchTerm)}
                                className="button"
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </div>
                </div>
                <br></br>
                {/* <label htmlFor="searchType">Beer: 
                        <input name="searchType" type="radio" value="beer" onChange={this.props.handleChange}></input>
                    </label>
                    <label htmlFor="searchType">Brewery: 
                        <input name="searchType" type="radio" value="brewery" onChange={this.props.handleChange}></input>
                    </label> */}
                {/* Random Beers Container */} {/* Loading animation */}
                {props.user.loading && (
                    <ReactLoading style={center} type="bubbles" color="black" />
                )}
                {!props.user.searchResults && !props.user.loading && (
                    <div className="my-beers-cont">
                        <h2>Random Beers</h2>

                        {randomBeerData &&
                            randomBeerData.map((beer) => {
                                return (
                                    <BeerRow search={true} beerData={beer} />
                                );
                            })}
                        {/* Empty div for slideAnimation of last beer */}
                        <div className="beer" style={{ height: "75px" }}></div>
                    </div>
                )}
                {/* Beer Container */}
                {!props.user.loading && (
                    <>
                        <h2>Results</h2>
                        <div className="my-beers-cont">
                            <div className="sort-btn-group">
                                <span className="blank-col">Sort by: </span>
                                <span
                                    className="sort-btn name-col"
                                    onClick={() => {
                                        console.log("sort name");
                                        setOrderType("beerName");
                                        setOrderAsc(
                                            props.user.searchSortType
                                                .searchType == "beerName"
                                                ? !orderAsc
                                                : false
                                        );
                                    }}
                                    onMouseEnter={() =>
                                        toggleHover((prevState) => {
                                            return {
                                                ...prevState,
                                                ...{ name: true },
                                            };
                                        })
                                    }
                                    onMouseLeave={() => toggleHover(false)}
                                >
                                    Name
                                    {hover.name &&
                                        props.user.searchSortType.searchType !==
                                            "beerName" && (
                                            <FontAwesomeIcon
                                                style={{ color: "black" }}
                                                icon={faSortAlphaDown}
                                            />
                                        )}
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "beerName" &&
                                        props.user.searchSortType.orderAsc && (
                                            // <span className="descend">&#9650;</span>
                                            <FontAwesomeIcon
                                                icon={faSortAlphaDown}
                                            />
                                        )}
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "beerName" &&
                                        !props.user.searchSortType.orderAsc && (
                                            // <span className="ascend">&#9660;</span>
                                            <FontAwesomeIcon
                                                icon={faSortAlphaUp}
                                            />
                                        )}
                                    {!hover.name && (
                                        <FontAwesomeIcon
                                            style={{ color: "gray" }}
                                            icon={faSortAlphaDown}
                                        />
                                    )}
                                </span>
                                <span
                                    className="sort-btn brewery-col"
                                    onClick={() => {
                                        setOrderType("breweryName");
                                        setOrderAsc(
                                            props.user.searchSortType
                                                .searchType == "breweryName"
                                                ? !orderAsc
                                                : false
                                        );
                                    }}
                                    onMouseEnter={() =>
                                        toggleHover((prevState) => {
                                            return {
                                                ...prevState,
                                                ...{ brewery: true },
                                            };
                                        })
                                    }
                                    onMouseLeave={() => toggleHover(false)}
                                >
                                    Brewery
                                    {hover.brewery &&
                                        props.user.searchSortType.searchType !==
                                            "breweryName" && (
                                            <span style={{ color: "gray" }}>
                                                &#9660;
                                            </span>
                                        )}
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "breweryName" &&
                                        props.user.searchSortType.orderAsc && (
                                            <span>&#9650;</span>
                                        )}
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "breweryName" &&
                                        !props.user.searchSortType.orderAsc && (
                                            <span>&#9660;</span>
                                        )}
                                </span>
                                <span
                                    className="sort-btn abv-col"
                                    onClick={() => {
                                        setOrderType("abv");
                                        setOrderAsc(
                                            props.user.searchSortType
                                                .searchType == "abv"
                                                ? !orderAsc
                                                : false
                                        );
                                    }}
                                    onMouseEnter={() =>
                                        toggleHover((prevState) => {
                                            return {
                                                ...prevState,
                                                ...{ abv: true },
                                            };
                                        })
                                    }
                                    onMouseLeave={() => toggleHover(false)}
                                >
                                    ABV
                                    {hover.abv &&
                                        props.user.searchSortType.searchType !==
                                            "abv" && (
                                            <span style={{ color: "gray" }}>
                                                &#9660;
                                            </span>
                                        )}
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "abv" &&
                                        props.user.searchSortType.orderAsc && (
                                            <span>&#9650;</span>
                                        )}
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "abv" &&
                                        !props.user.searchSortType.orderAsc && (
                                            <span>&#9660;</span>
                                        )}
                                </span>
                                <span
                                    className="sort-btn desc-col"
                                    onClick={() => {
                                        setOrderType("beerDescription");
                                        setOrderAsc(
                                            props.user.searchSortType
                                                .searchType == "beerDescription"
                                                ? !orderAsc
                                                : false
                                        );
                                    }}
                                    onMouseEnter={() =>
                                        toggleHover((prevState) => {
                                            return {
                                                ...prevState,
                                                ...{ type: true },
                                            };
                                        })
                                    }
                                    onMouseLeave={() => toggleHover(false)}
                                >
                                    Type
                                    {hover.type &&
                                        props.user.searchSortType.searchType !==
                                            "beerDescription" && (
                                            <span style={{ color: "gray" }}>
                                                &#9660;
                                            </span>
                                        )}
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "beerDescription" &&
                                        props.user.searchSortType.orderAsc && (
                                            <span>&#9650;</span>
                                        )}
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "beerDescription" &&
                                        !props.user.searchSortType.orderAsc && (
                                            <span>&#9660;</span>
                                        )}
                                </span>
                            </div>

                            {beers}
                            {/* Empty div for slideAnimation of last beer */}
                            <div
                                className={
                                    props.user.colorScheme !== "dark"
                                        ? "beer"
                                        : "beer dark-theme"
                                }
                                style={{ height: "200px" }}
                            ></div>
                        </div>
                    </>
                )}
            </>
        </div>
    );
}

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
