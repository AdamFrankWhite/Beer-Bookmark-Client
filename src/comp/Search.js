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

const element = <FontAwesomeIcon icon={faSearch} />;
function Search(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [orderAsc, setOrderAsc] = useState(true);
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
                    <div className="beer-container">
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
                        <div className="beer-container">
                            <div className="sort-btn-group">
                                <span>Sort by: </span>
                                <span
                                    className="sort-btn"
                                    onClick={() => {
                                        props.sortSearchResults(
                                            props.user.searchResults,
                                            "beerName",
                                            orderAsc
                                        );
                                        setOrderAsc(!orderAsc);
                                    }}
                                >
                                    Name
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "beerName" &&
                                        props.user.searchSortType.orderAsc && (
                                            <span>&#9660;</span>
                                        )}
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "beerName" &&
                                        !props.user.searchSortType.orderAsc && (
                                            <span>&#9650;</span>
                                        )}
                                </span>

                                <span
                                    className="sort-btn"
                                    onClick={() => {
                                        props.sortSearchResults(
                                            props.user.searchResults,
                                            "beerDescription",
                                            orderAsc
                                        );
                                        setOrderAsc(!orderAsc);
                                    }}
                                >
                                    Type
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "beerDescription" &&
                                        props.user.searchSortType.orderAsc && (
                                            <span>&#9660;</span>
                                        )}
                                    {props.user.searchSortType &&
                                        props.user.searchSortType.searchType ==
                                            "beerDescription" &&
                                        !props.user.searchSortType.orderAsc && (
                                            <span>&#9650;</span>
                                        )}
                                </span>
                                <span
                                    className="sort-btn"
                                    onClick={() => {
                                        props.sortSearchResults(
                                            props.user.searchResults,
                                            "abv",
                                            orderAsc
                                        );
                                        setOrderAsc(!orderAsc);
                                    }}
                                >
                                    ABV
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
                                    className="sort-btn"
                                    onClick={() => {
                                        props.sortSearchResults(
                                            props.user.searchResults,
                                            "breweryName",
                                            orderAsc
                                        );
                                        setOrderAsc(!orderAsc);
                                    }}
                                >
                                    Brewery
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
                            </div>

                            {beers}
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
