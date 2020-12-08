import React, { useState, useEffect } from "react";
import BeerRow from "./BeerRow";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import {
    sortBeers,
    sortBeersByGroup,
    toggleModal,
} from "../redux/actions/userActions";
import SortButton from "./SortButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";

const MyBeers = ({ user, sortBeers, sortBeersByGroup, toggleModal }) => {
    const center = { margin: "auto" };
    //Set order asc/desc
    const [orderAsc, setOrderAsc] = useState(false);
    const [currentBeerList, setCurrentBeerList] = useState(user.beers);
    const [hover, toggleHover] = useState("");
    const [orderType, setOrderType] = useState("");
    const [selectedBeerGroup, setSelectedBeerGroup] = useState("all-beers");
    //Keep track of selected group
    const [beerGroup, setBeerGroup] = useState(null);
    //When db beers update, sortbeers conditionally
    //Ensures instant rating update
    useEffect(() => {
        sortBeersByGroup(user.beers, beerGroup);
    }, [user.beers]);

    useEffect(() => {
        sortBeers(currentBeerList, orderType, orderAsc);
    }, [orderType, orderAsc]);
    useEffect(() => {
        setCurrentBeerList(user.sortedBeers);
    }, [user.sortedBeers]);

    const setOrder = (type) => {
        setOrderType(type);
        setOrderAsc(user.sortType.searchType == type ? !orderAsc : true);
    };
    const isDarkTheme = user.colorScheme == "dark" ? true : false;
    const hoverColorMain = isDarkTheme ? "white" : "black";
    const checkHover = (type) => {
        return (hover == type && user.sortType.searchType !== type) ||
            user.sortType.searchType == type
            ? hoverColorMain
            : "gray";
    };
    const sortTypes = [
        { name: "Beer", type: "beerName" },
        { name: "Brewer", type: "breweryName" },
        { name: "ABV", type: "abv" },
        { name: "Type", type: "beerDescription" },
        { name: "Rating", type: "stars" },
    ];
    return (
        <div className="App">
            {/* <div className="my-beers-wrapper"> */}
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
            <div className="my-beers-wrapper">
                <div className="my-beer-groups">
                    <h2>My Beer Groups</h2>
                    <span
                        className={
                            selectedBeerGroup == "all-beers"
                                ? "highlight-folder"
                                : "folder"
                        }
                        onClick={() => {
                            sortBeers(user.beers);
                            setSelectedBeerGroup("all-beers");
                        }}
                    >
                        <FontAwesomeIcon icon={faFolder} /> All Beers
                    </span>

                    {user.beerGroups.map((beerGroup) => {
                        return (
                            <span
                                className={
                                    selectedBeerGroup == beerGroup
                                        ? "highlight-folder pl-1"
                                        : "folder pl-1"
                                }
                                onClick={() => {
                                    setBeerGroup(beerGroup);
                                    sortBeersByGroup(user.beers, beerGroup);
                                    setSelectedBeerGroup(beerGroup);
                                }}
                            >
                                <FontAwesomeIcon icon={faFolder} />
                                <span className="text">{beerGroup}</span>
                            </span>
                        );
                    })}
                    <span onClick={() => toggleModal(true, true)}>
                        Manage Groups
                    </span>
                </div>
                <div
                    className={
                        user.colorScheme !== "dark"
                            ? "beers-cont my-beers-cont"
                            : "beers-cont my-beers-cont dark-theme-secondary"
                    }
                >
                    {/* My Beer Groups */}

                    <div className="sort-btn-group">
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
                    {user.sortedBeers &&
                        user.sortedBeers.map((beer) => (
                            <BeerRow
                                myBeers={true}
                                beerData={beer}
                                brewery={beer.brewery}
                            />
                        ))}
                </div>
            </div>
            {/* </div> */}

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
    sortBeersByGroup,
    toggleModal,
};
export default connect(mapStateToProps, mapActionsToProps)(MyBeers);
