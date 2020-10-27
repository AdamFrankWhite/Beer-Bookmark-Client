import React, { useState, useEffect } from "react";
import BeerRow from "./BeerRow";
import ReactLoading from "react-loading";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import userReducer from "../redux/reducers/userReducer";
const MyBeers = (props) => {
    const center = { margin: "auto" };

    const beers = props.user.beers.map((beer) => (
        <BeerRow myBeers={true} beerData={beer} brewery={beer.brewery} />
    ));
    const [sortedBeers, setSortedBeers] = useState(beers);
    useEffect(() => {
        setSortedBeers(beers);
    }, [props.user.beers]);
    //Set order asc/desc
    const [orderAsc, setOrderAsc] = useState(false);
    const sortBeers = (searchType) => {
        let sortedBeers;
        if (orderAsc) {
            sortedBeers = props.user.beers.sort((a, b) =>
                a[searchType] > b[searchType]
                    ? 1
                    : b[searchType] > a[searchType]
                    ? -1
                    : 0
            );
        } else {
            sortedBeers = props.user.beers.sort((a, b) =>
                a[searchType] < b[searchType]
                    ? 1
                    : b[searchType] < a[searchType]
                    ? -1
                    : 0
            );
        }

        setSortedBeers(
            sortedBeers.map((beer) => (
                <BeerRow
                    myBeers={true}
                    beerData={beer}
                    brewery={beer.brewery}
                />
            ))
        );
    };

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
                            sortBeers("beerName");
                            setOrderAsc(!orderAsc);
                        }}
                    >
                        Name
                    </span>
                    <span
                        className="sort-btn"
                        onClick={() => {
                            sortBeers("stars");
                            setOrderAsc(!orderAsc);
                        }}
                    >
                        Top Rated
                    </span>
                    <span
                        className="sort-btn"
                        onClick={() => {
                            sortBeers("beerDescription");
                            setOrderAsc(!orderAsc);
                        }}
                    >
                        Type
                    </span>
                    <span
                        className="sort-btn"
                        onClick={() => {
                            sortBeers("abv");
                            setOrderAsc(!orderAsc);
                        }}
                    >
                        ABV
                    </span>
                    <span
                        className="sort-btn"
                        onClick={() => {
                            sortBeers("brewery");
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
                    {sortedBeers}
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

const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(MyBeers);
