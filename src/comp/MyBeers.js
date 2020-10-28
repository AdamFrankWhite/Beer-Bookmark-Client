import React, { useState, useEffect } from "react";
import BeerRow from "./BeerRow";
import ReactLoading from "react-loading";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import userReducer from "../redux/reducers/userReducer";
import { sortBeers } from "../redux/actions/userActions";
const MyBeers = (props) => {
    const center = { margin: "auto" };

    // const [sortedBeers, setSortedBeers] = useState(beers);
    // //Populate array on component mount
    useEffect(() => {
        props.sortBeers(props.user.beers);
    }, [props.user.beers]);
    //Set order asc/desc
    const [orderAsc, setOrderAsc] = useState(false);

    return (
        <div className="App">
            <div className="my-beers-wrapper">
                <div className="my-beers-banner">
                    <h1>My Favourite Beers</h1>
                </div>

                <div className="sort-btn-group">
                    <span>Sort by: </span>
                    <span
                        className="sort-btn"
                        onClick={() => {
                            props.sortBeers(
                                props.user.beers,
                                "beerName",
                                orderAsc
                            );
                            setOrderAsc(!orderAsc);
                        }}
                    >
                        Name
                    </span>
                    <span
                        className="sort-btn"
                        onClick={() => {
                            props.sortBeers(
                                props.user.beers,
                                "stars",
                                orderAsc
                            );
                            setOrderAsc(!orderAsc);
                        }}
                    >
                        Top Rated
                    </span>
                    <span
                        className="sort-btn"
                        onClick={() => {
                            props.sortBeers(
                                props.user.beers,
                                "beerDescription",
                                orderAsc
                            );
                            setOrderAsc(!orderAsc);
                        }}
                    >
                        Type
                    </span>
                    <span
                        className="sort-btn"
                        onClick={() => {
                            props.sortBeers(props.user.beers, "abv", orderAsc);
                            setOrderAsc(!orderAsc);
                        }}
                    >
                        ABV
                    </span>
                    <span
                        className="sort-btn"
                        onClick={() => {
                            props.sortBeers(
                                props.user.beers,
                                "brewery",
                                orderAsc
                            );
                            setOrderAsc(!orderAsc);
                        }}
                    >
                        Brewery
                    </span>
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
                    {props.user.sortedBeers &&
                        props.user.sortedBeers.map((beer) => (
                            <BeerRow
                                myBeers={true}
                                beerData={beer}
                                brewery={beer.brewery}
                            />
                        ))}
                    {/* Empty div for slideAnimation of last beer */}
                    <div className="beer" style={{ height: "200px" }}></div>

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
