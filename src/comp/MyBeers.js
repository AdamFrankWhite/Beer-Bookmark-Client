import React, { useState, useEffect } from "react";
import BeerRow from "./BeerRow";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import { sortBeers, sortBeersByGroup } from "../redux/actions/userActions";
import SortButton from "./SortButton";
const MyBeers = ({ user, sortBeers, sortBeersByGroup }) => {
    const center = { margin: "auto" };
    //Set order asc/desc
    const [orderAsc, setOrderAsc] = useState(false);

    const [hover, toggleHover] = useState("");
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
                    {/* My Beer Groups */}
                    <h2>My Beer Groups</h2>
                    <span onClick={() => sortBeers(user.beers)}>All Beers</span>
                    {user.beerGroups.map((beerGroup) => {
                        return (
                            <span
                                onClick={() =>
                                    sortBeersByGroup(user.beers, beerGroup)
                                }
                            >
                                {beerGroup}
                            </span>
                        );
                    })}
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
                    {/* Empty div for slideAnimation of last beer */}
                    <div
                        className={
                            user.colorScheme !== "dark"
                                ? "beer"
                                : "beer dark-theme"
                        }
                        style={{ height: "200px" }}
                    ></div>
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
    sortBeersByGroup,
};
export default connect(mapStateToProps, mapActionsToProps)(MyBeers);
