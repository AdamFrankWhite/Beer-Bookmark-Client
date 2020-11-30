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
const MyBeers = (props) => {
    const center = { margin: "auto" };
    //Set order asc/desc
    const [orderAsc, setOrderAsc] = useState(false);

    const [hover, toggleHover] = useState({
        name: false,
        brewery: false,
        type: false,
        abv: false,
        rating: false,
    });
    const [sortedBeers, setSortedBeers] = useState(props.user.beers);
    const [orderType, setOrderType] = useState("");
    //Populate array on component mount
    useEffect(() => {
        props.sortBeers(props.user.beers);
    }, [props.user.beers]);
    useEffect(() => {
        props.sortBeers(props.user.beers, orderType, orderAsc);
    }, [orderType, orderAsc]);
    const setOrder = (type) => {
        setOrderType(type);
        setOrderAsc(props.user.sortType.searchType == type ? !orderAsc : true);
    };
    return (
        <div className="App">
            <div className="my-beers-wrapper">
                <div className="my-beers-banner">
                    <h1>My Favourite Beers</h1>
                </div>

                {props.user.isLoading && (
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
                                props.user.sortType.searchType !==
                                    "beerName" && (
                                    <FontAwesomeIcon
                                        style={{ color: "black" }}
                                        icon={faSortAlphaDown}
                                    />
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "beerName" &&
                                props.user.sortType.orderAsc && (
                                    // <span className="descend">&#9650;</span>
                                    <FontAwesomeIcon icon={faSortAlphaDown} />
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "beerName" &&
                                !props.user.sortType.orderAsc && (
                                    // <span className="ascend">&#9660;</span>
                                    <FontAwesomeIcon icon={faSortAlphaUp} />
                                )}
                            {!hover.name &&
                                props.user.sortType.searchType !==
                                    "beerName" && (
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
                                props.user.sortType.searchType !==
                                    "breweryName" && (
                                    <FontAwesomeIcon
                                        style={{ color: "black" }}
                                        icon={faSortAlphaDown}
                                    />
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType ==
                                    "breweryName" &&
                                props.user.sortType.orderAsc && (
                                    // <span className="descend">&#9650;</span>
                                    <FontAwesomeIcon icon={faSortAlphaDown} />
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType ==
                                    "breweryName" &&
                                !props.user.sortType.orderAsc && (
                                    // <span className="ascend">&#9660;</span>
                                    <FontAwesomeIcon icon={faSortAlphaUp} />
                                )}
                            {!hover.brewery &&
                                props.user.sortType.searchType !==
                                    "breweryName" && (
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
                                props.user.sortType.searchType !== "abv" && (
                                    <FontAwesomeIcon
                                        style={{ color: "black" }}
                                        icon={faSortNumericDown}
                                    />
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "abv" &&
                                props.user.sortType.orderAsc && (
                                    // <span className="descend">&#9650;</span>
                                    <FontAwesomeIcon icon={faSortNumericDown} />
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "abv" &&
                                !props.user.sortType.orderAsc && (
                                    // <span className="ascend">&#9660;</span>
                                    <FontAwesomeIcon icon={faSortNumericUp} />
                                )}
                            {!hover.abv &&
                                props.user.sortType.searchType !== "abv" && (
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
                                props.user.sortType.searchType !==
                                    "beerDescription" && (
                                    <FontAwesomeIcon
                                        style={{ color: "black" }}
                                        icon={faSortAlphaDown}
                                    />
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType ==
                                    "beerDescription" &&
                                !props.user.sortType.orderAsc && (
                                    // <span className="descend">&#9650;</span>
                                    <FontAwesomeIcon icon={faSortAlphaUp} />
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType ==
                                    "beerDescription" &&
                                props.user.sortType.orderAsc && (
                                    // <span className="ascend">&#9660;</span>
                                    <FontAwesomeIcon icon={faSortAlphaDown} />
                                )}
                            {!hover.type &&
                                props.user.sortType.searchType !==
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
                            onMouseEnter={() =>
                                toggleHover((prevState) => {
                                    return {
                                        ...prevState,
                                        ...{ rating: true },
                                    };
                                })
                            }
                            onMouseLeave={() => toggleHover(false)}
                        >
                            Rating
                            {hover.rating &&
                                props.user.sortType.searchType !== "stars" && (
                                    <FontAwesomeIcon
                                        style={{ color: "black" }}
                                        icon={faSortNumericDown}
                                    />
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "stars" &&
                                props.user.sortType.orderAsc && (
                                    // <span className="descend">&#9650;</span>
                                    <FontAwesomeIcon icon={faSortNumericDown} />
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "stars" &&
                                !props.user.sortType.orderAsc && (
                                    // <span className="ascend">&#9660;</span>
                                    <FontAwesomeIcon icon={faSortNumericUp} />
                                )}
                            {!hover.rating &&
                                props.user.sortType.searchType !== "stars" && (
                                    <FontAwesomeIcon
                                        style={{ color: "gray" }}
                                        icon={faSortNumericDown}
                                    />
                                )}
                        </span>
                    </div>

                    {props.user.sortedBeers &&
                        props.user.sortedBeers.map((beer) => (
                            <BeerRow
                                myBeers={true}
                                beerData={beer}
                                brewery={beer.brewery}
                            />
                        ))}
                    {/* Empty div for slideAnimation of last beer */}
                    <div
                        className={
                            props.user.colorScheme !== "dark"
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
