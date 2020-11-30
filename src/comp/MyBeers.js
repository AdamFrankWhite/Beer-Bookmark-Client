import React, { useState, useEffect } from "react";
import BeerRow from "./BeerRow";
import ReactLoading from "react-loading";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons/faSortAlphaDown";
import { faSortAlphaUp } from "@fortawesome/free-solid-svg-icons/faSortAlphaUp";
import { faSortNumericDown } from "@fortawesome/free-solid-svg-icons/faSortNumericDown";
import { faSortNumericUp } from "@fortawesome/free-solid-svg-icons/faSortNumericUp";
import { sortBeers } from "../redux/actions/userActions";
const MyBeers = ({ user, sortBeers }) => {
    const center = { margin: "auto" };
    //Set order asc/desc
    const [orderAsc, setOrderAsc] = useState(false);

    const [hover, toggleHover] = useState("");
    const [sortedBeers, setSortedBeers] = useState(user.beers);
    const [orderType, setOrderType] = useState("");
    //Populate array on component mount
    useEffect(() => {
        sortBeers(user.beers);
    }, [user.beers]);
    useEffect(() => {
        sortBeers(user.beers, orderType, orderAsc);
    }, [orderType, orderAsc]);
    const setOrder = (type) => {
        setOrderType(type);
        setOrderAsc(user.sortType.searchType == type ? !orderAsc : true);
    };
    return (
        <div className="App">
            <div className="my-beers-wrapper">
                <div className="my-beers-banner">
                    <h1>My Favourite Beers</h1>
                </div>

                {user.isLoading && (
                    <ReactLoading
                        style={center}
                        type="bubbles"
                        color="black"
                        height={400}
                        width={350}
                    />
                )}
                <div className="my-beers-cont">
                    <div className="sort-btn-group">
                        <span className="blank-col">Sort by: </span>
                        <span
                            className="sort-btn name-col"
                            onClick={() => {
                                setOrder("beerName");
                            }}
                            onMouseEnter={() => toggleHover("beerName")}
                            onMouseLeave={() => toggleHover(false)}
                        >
                            Name
                            {hover == "beerName" &&
                                user.sortType.searchType !== "beerName" && (
                                    <FontAwesomeIcon
                                        style={{ color: "black" }}
                                        icon={faSortAlphaDown}
                                    />
                                )}
                            {user.sortType &&
                                user.sortType.searchType == "beerName" &&
                                user.sortType.orderAsc && (
                                    // <span className="descend">&#9650;</span>
                                    <FontAwesomeIcon icon={faSortAlphaDown} />
                                )}
                            {user.sortType &&
                                user.sortType.searchType == "beerName" &&
                                !user.sortType.orderAsc && (
                                    // <span className="ascend">&#9660;</span>
                                    <FontAwesomeIcon icon={faSortAlphaUp} />
                                )}
                            {hover !== "beerName" &&
                                user.sortType.searchType !== "beerName" && (
                                    <FontAwesomeIcon
                                        style={{ color: "gray" }}
                                        icon={faSortAlphaDown}
                                    />
                                )}
                        </span>
                        <span
                            className="sort-btn brewery-col"
                            onClick={() => {
                                setOrder("breweryName");
                            }}
                            onMouseEnter={() => toggleHover("breweryName")}
                            onMouseLeave={() => toggleHover(false)}
                        >
                            Brewery
                            {hover == "breweryName" &&
                                user.sortType.searchType !== "breweryName" && (
                                    <FontAwesomeIcon
                                        style={{ color: "black" }}
                                        icon={faSortAlphaDown}
                                    />
                                )}
                            {user.sortType &&
                                user.sortType.searchType == "breweryName" &&
                                user.sortType.orderAsc && (
                                    // <span className="descend">&#9650;</span>
                                    <FontAwesomeIcon icon={faSortAlphaDown} />
                                )}
                            {user.sortType &&
                                user.sortType.searchType == "breweryName" &&
                                !user.sortType.orderAsc && (
                                    // <span className="ascend">&#9660;</span>
                                    <FontAwesomeIcon icon={faSortAlphaUp} />
                                )}
                            {hover !== "breweryName" &&
                                user.sortType.searchType !== "breweryName" && (
                                    <FontAwesomeIcon
                                        style={{ color: "gray" }}
                                        icon={faSortAlphaDown}
                                    />
                                )}
                        </span>
                        <span
                            className="sort-btn abv-col"
                            onClick={() => {
                                setOrder("abv");
                            }}
                            onMouseEnter={() => toggleHover("abv")}
                            onMouseLeave={() => toggleHover(false)}
                        >
                            ABV
                            {hover == "abv" &&
                                user.sortType.searchType !== "abv" && (
                                    <FontAwesomeIcon
                                        style={{ color: "black" }}
                                        icon={faSortNumericDown}
                                    />
                                )}
                            {user.sortType &&
                                user.sortType.searchType == "abv" &&
                                user.sortType.orderAsc && (
                                    // <span className="descend">&#9650;</span>
                                    <FontAwesomeIcon icon={faSortNumericDown} />
                                )}
                            {user.sortType &&
                                user.sortType.searchType == "abv" &&
                                !user.sortType.orderAsc && (
                                    // <span className="ascend">&#9660;</span>
                                    <FontAwesomeIcon icon={faSortNumericUp} />
                                )}
                            {hover !== "abv" &&
                                user.sortType.searchType !== "abv" && (
                                    <FontAwesomeIcon
                                        style={{ color: "gray" }}
                                        icon={faSortNumericDown}
                                    />
                                )}
                        </span>
                        <span
                            className="sort-btn desc-col"
                            onClick={() => {
                                setOrder("beerDescription");
                            }}
                            onMouseEnter={() => toggleHover("beerDescription")}
                            onMouseLeave={() => toggleHover(false)}
                        >
                            Type
                            {hover == "beerDescription" &&
                                user.sortType.searchType !==
                                    "beerDescription" && (
                                    <FontAwesomeIcon
                                        style={{ color: "black" }}
                                        icon={faSortAlphaDown}
                                    />
                                )}
                            {user.sortType &&
                                user.sortType.searchType == "beerDescription" &&
                                !user.sortType.orderAsc && (
                                    // <span className="descend">&#9650;</span>
                                    <FontAwesomeIcon icon={faSortAlphaUp} />
                                )}
                            {user.sortType &&
                                user.sortType.searchType == "beerDescription" &&
                                user.sortType.orderAsc && (
                                    // <span className="ascend">&#9660;</span>
                                    <FontAwesomeIcon icon={faSortAlphaDown} />
                                )}
                            {hover !== "beerDescription" &&
                                user.sortType.searchType !==
                                    "beerDescription" && (
                                    <FontAwesomeIcon
                                        style={{ color: "gray" }}
                                        icon={faSortAlphaDown}
                                    />
                                )}
                        </span>
                        <span
                            className="sort-btn rate-col"
                            onClick={() => {
                                setOrder("stars");
                            }}
                            onMouseEnter={() => toggleHover("stars")}
                            onMouseLeave={() => toggleHover(false)}
                        >
                            Rating
                            {hover == "stars" &&
                                user.sortType.searchType !== "stars" && (
                                    <FontAwesomeIcon
                                        style={{ color: "black" }}
                                        icon={faSortNumericDown}
                                    />
                                )}
                            {user.sortType &&
                                user.sortType.searchType == "stars" &&
                                user.sortType.orderAsc && (
                                    // <span className="descend">&#9650;</span>
                                    <FontAwesomeIcon icon={faSortNumericDown} />
                                )}
                            {user.sortType &&
                                user.sortType.searchType == "stars" &&
                                !user.sortType.orderAsc && (
                                    // <span className="ascend">&#9660;</span>
                                    <FontAwesomeIcon icon={faSortNumericUp} />
                                )}
                            {hover !== "stars" &&
                                user.sortType.searchType !== "stars" && (
                                    <FontAwesomeIcon
                                        style={{ color: "gray" }}
                                        icon={faSortNumericDown}
                                    />
                                )}
                        </span>
                    </div>

                    {user.sortedBeers &&
                        user.sortedBeers.map((beer) => (
                            <BeerRow
                                myBeers={true}
                                beerData={beer}
                                brewery={beer.brewery}
                            />
                        ))}
                    {/* Empty div for slideAnimation of last beer */}
                    <div
                        className={
                            user.colorScheme !== "dark"
                                ? "beer"
                                : "beer dark-theme"
                        }
                        style={{ height: "200px" }}
                    ></div>

                    {/* </FlipMove> */}
                </div>
            </div>

            {/* <div className="my-breweries-cont">
                    <h1 className="heading">My Favourite Breweries</h1>
                </div> */}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    sortBeers,
};
export default connect(mapStateToProps, mapActionsToProps)(MyBeers);
