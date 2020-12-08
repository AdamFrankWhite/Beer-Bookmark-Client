import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import {
    toggleModal,
    deleteBeer,
    rateBeer,
    setBrewery,
} from "../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import MouseTooltip from "react-sticky-mouse-tooltip";

function BeerRow({
    user,
    search,
    toggleModal,
    deleteBeer,
    rateBeer,
    beerData,
    myBeers,
    setBrewery,
}) {
    let checkBeerIncluded = beerCheck();
    function beerCheck() {
        return (
            search &&
            user.beers &&
            JSON.stringify(user.beers).includes(beerData.id)
        );
    }

    const spinnerStyle = { marginLeft: 0, height: 25, width: 25, fill: "blue" };
    const clickTextStyle = checkBeerIncluded && "click-text-saved";
    const clickText = checkBeerIncluded ? "Saved" : "Add to favourites";
    const conditionalTextColor =
        user.colorScheme == "light" ? "#000000" : "#ffffff";
    useEffect(() => {
        checkBeerIncluded = beerCheck();
    }, [user.searchSortType, user.beers]);
    const [toggleTooltip, setToggleToolTip] = useState(false);
    const [confirmDelete, toggleDelete] = useState(false);
    const [rating, setRating] = useState(1);
    const [editRating, setEditRating] = useState(false);
    //Selected Beer
    const [selectedBeer, setSelectedBeer] = useState(null);
    //Init null to avoid initial collapse animation
    const [showRow, toggleShowRow] = useState(null);
    useEffect(() => {
        console.log(beerData);
    });
    // let beerTypeStyle;
    // if (beerData.beerDescription.toLowerCase().includes("ipa")) {
    //     beerTypeStyle = { backgroundColor: "blue" };
    // } else if (beerData.beerDescription.toLowerCase().includes("lager")) {
    //     beerTypeStyle = { backgroundColor: "maroon" };
    // }
    return (
        <>
            <div
                className={
                    user.colorScheme !== "dark"
                        ? "beer"
                        : "beer dark-theme-secondary"
                }
            >
                <img className="thumb" alt="beer" src={beerData.img}></img>

                <h2>{beerData.beerName}</h2>

                <Link
                    to={`/brewery/${beerData.brewery.brewery_slug}`}
                    onClick={() => setBrewery(beerData.brewery)}
                    style={
                        user.colorScheme !== "dark"
                            ? { color: "black" }
                            : { color: "white" }
                    }
                >
                    <h4>{beerData.brewery.brewery_name}</h4>
                </Link>

                <h5>ABV: {beerData.abv}%</h5>

                <h5 className="description">{beerData.beerDescription}</h5>

                {myBeers && (
                    <>
                        {editRating ? (
                            <div className="set-rating">
                                <div className="set-rating-row-1">
                                    <span>&#127866;</span>
                                    <input
                                        type="number"
                                        max="10"
                                        min="1"
                                        value={rating}
                                        style={{ color: conditionalTextColor }}
                                        onChange={(e) => {
                                            setRating(+e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="delete-buttons">
                                    <span
                                        onClick={() => {
                                            console.log(user.searchType);
                                            rateBeer(
                                                beerData,
                                                user.userData.username,
                                                rating,
                                                user.sortType,
                                                user.beers
                                            );
                                            setEditRating(false);
                                        }}
                                        className="tick"
                                    >
                                        &#9989;
                                    </span>
                                    <span
                                        className="cross"
                                        onClick={() => setEditRating(false)}
                                    >
                                        &#10062;
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <span
                                className="buttons"
                                onClick={() => {
                                    setSelectedBeer(beerData);
                                    setEditRating(true);
                                }}
                            >
                                {user.loading && selectedBeer == beerData ? (
                                    <ReactLoading
                                        style={spinnerStyle}
                                        type="spin"
                                    />
                                ) : (
                                    <>
                                        <span
                                            onMouseEnter={() =>
                                                setToggleToolTip(true)
                                            }
                                            onMouseLeave={() =>
                                                setToggleToolTip(false)
                                            }
                                        >
                                            &#127866; {beerData.stars}
                                        </span>
                                        <MouseTooltip
                                            visible={toggleTooltip}
                                            offsetX={13}
                                            offsetY={7}
                                        >
                                            <span className="tooltip">
                                                edit
                                            </span>
                                        </MouseTooltip>
                                    </>
                                )}
                            </span>
                        )}
                    </>
                )}

                {/* //TODO - add buy button and affiliate <a target="_blank" href={`https://www.beerhawk.co.uk/search/?q=${beerData.beerName||name}+${brewery}`}><span>Buy</span></a> */}
                {/* {myBeers && (
                    <span
                        onClick={setState({ confirmDelete: true })}
                        className="delete-beer"
                    >
                        Delete
                    </span>
                )} */}

                {myBeers && confirmDelete && (
                    <div className="delete-confirm">
                        <span>Are you sure?</span>
                        <div>
                            <span
                                onClick={() => {
                                    deleteBeer(
                                        {
                                            username: user.userData.username,
                                            beerData: beerData,
                                        },
                                        user.sortType
                                    );
                                    toggleDelete(false);
                                }}
                                className="delete-beer"
                            >
                                Yes
                            </span>
                            <span
                                onClick={() => {
                                    toggleDelete(false);
                                }}
                                className="delete-beer"
                            >
                                No
                            </span>
                        </div>
                    </div>
                )}
                {myBeers && !confirmDelete && (
                    <span
                        onClick={() => toggleDelete(true)}
                        className="delete-beer"
                    >
                        Remove
                    </span>
                )}

                {/* Bookmark Cell */}
                {search && (
                    <span
                        onClick={() => {
                            //only add to favourites if not already included

                            !checkBeerIncluded &&
                                user.loggedIn &&
                                toggleModal(true, false, beerData);
                        }}
                        className={clickTextStyle + " buttons"}
                    >
                        {user.loggedIn && clickText}
                    </span>
                )}
                <span
                    className="more-info"
                    onClick={() => {
                        toggleShowRow(!showRow);
                    }}
                    style={{ padding: "0 0.5em" }}
                >
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </div>
            {/* More Info Scroll */}
            <SlideDown className={"my-dropdown-slidedown"}>
                {showRow && beerData.beerInfo}
            </SlideDown>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    deleteBeer,
    toggleModal,
    rateBeer,
    setBrewery,
};
export default connect(mapStateToProps, mapActionsToProps)(BeerRow);
