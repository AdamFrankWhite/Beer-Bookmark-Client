import React, { useState, useEffect } from "react";
import BeerRow from "./BeerRow";
import ReactLoading from "react-loading";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import userReducer from "../redux/reducers/userReducer";
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
                                setOrderType("beerName");
                                setOrderAsc(
                                    props.user.sortType.searchType == "beerName"
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
                                props.user.sortType.searchType !==
                                    "beerName" && (
                                    <span style={{ color: "gray" }}>
                                        &#9660;
                                    </span>
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "beerName" &&
                                props.user.sortType.orderAsc && (
                                    <span className="descend">&#9650;</span>
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "beerName" &&
                                !props.user.sortType.orderAsc && (
                                    <span className="ascend">&#9660;</span>
                                )}
                        </span>
                        <span
                            className="sort-btn brewery-col"
                            onClick={() => {
                                setOrderType("breweryName");
                                setOrderAsc(
                                    props.user.sortType.searchType ==
                                        "breweryName"
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
                                props.user.sortType.searchType !==
                                    "breweryName" && (
                                    <span style={{ color: "gray" }}>
                                        &#9660;
                                    </span>
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType ==
                                    "breweryName" &&
                                props.user.sortType.orderAsc && (
                                    <span>&#9650;</span>
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType ==
                                    "breweryName" &&
                                !props.user.sortType.orderAsc && (
                                    <span>&#9660;</span>
                                )}
                        </span>
                        <span
                            className="sort-btn abv-col"
                            onClick={() => {
                                setOrderType("abv");
                                setOrderAsc(
                                    props.user.sortType.searchType == "abv"
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
                                props.user.sortType.searchType !== "abv" && (
                                    <span style={{ color: "gray" }}>
                                        &#9660;
                                    </span>
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "abv" &&
                                props.user.sortType.orderAsc && (
                                    <span>&#9650;</span>
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "abv" &&
                                !props.user.sortType.orderAsc && (
                                    <span>&#9660;</span>
                                )}
                        </span>
                        <span
                            className="sort-btn desc-col"
                            onClick={() => {
                                setOrderType("beerDescription");
                                setOrderAsc(
                                    props.user.sortType.searchType ==
                                        "beerDescription"
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
                                props.user.sortType.searchType !==
                                    "beerDescription" && (
                                    <span style={{ color: "gray" }}>
                                        &#9660;
                                    </span>
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType ==
                                    "beerDescription" &&
                                props.user.sortType.orderAsc && (
                                    <span>&#9650;</span>
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType ==
                                    "beerDescription" &&
                                !props.user.sortType.orderAsc && (
                                    <span>&#9660;</span>
                                )}
                        </span>
                        <span
                            className="sort-btn rate-col"
                            onClick={() => {
                                setOrderType("stars");
                                setOrderAsc(
                                    props.user.sortType.searchType == "stars"
                                        ? !orderAsc
                                        : false
                                );
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
                                    <span style={{ color: "gray" }}>
                                        &#9660;
                                    </span>
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "stars" &&
                                props.user.sortType.orderAsc && (
                                    <span>&#9650;</span>
                                )}
                            {props.user.sortType &&
                                props.user.sortType.searchType == "stars" &&
                                !props.user.sortType.orderAsc && (
                                    <span>&#9660;</span>
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
