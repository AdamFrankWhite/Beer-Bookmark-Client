import React, { useState, useRef, useEffect } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import { addBeer, deleteBeer, rateBeer } from "../redux/actions/userActions";
function BeerRow(props) {
    const checkBeerIncluded =
        props.search &&
        props.user.beers &&
        JSON.stringify(props.user.beers).includes(props.beerData.id);
    const center = { margin: "auto", height: 25, width: 25 };
    const clickTextStyle = checkBeerIncluded && "click-text-saved";
    const [clickText, setClickText] = useState(
        checkBeerIncluded ? "Saved" : "Add to favourites"
    );
    const [confirmDelete, toggleDelete] = useState(false);
    const [rating, setRating] = useState("");
    const [editRating, setEditRating] = useState(false);
    //Selected Beer
    const [selectedBeer, setSelectedBeer] = useState(null);
    //Init null to avoid initial collapse animation
    const [showRow, toggleShowRow] = useState(null);
    let infoStyle;
    const targetRef = useRef();
    const [height, setHeight] = useState(0);
    if (showRow) {
        infoStyle = {
            height: `calc(${height} + 2em)`,
            transition: "all 1s",
        };
    }
    if (showRow === false) {
        infoStyle = {
            // transition: "margin-bottom 0.5s",
            marginBottom: -height,
        };
    }
    useEffect(() => {
        if (targetRef.current) {
            setHeight(targetRef.current.clientHeight);
        }
    });
    // let beerTypeStyle;
    // if (props.beerData.beerDescription.toLowerCase().includes("ipa")) {
    //     beerTypeStyle = { backgroundColor: "blue" };
    // } else if (props.beerData.beerDescription.toLowerCase().includes("lager")) {
    //     beerTypeStyle = { backgroundColor: "maroon" };
    // }
    return (
        <>
            <div
                className={
                    props.user.colorScheme !== "dark"
                        ? "beer"
                        : "beer dark-theme-secondary"
                }
            >
                <img
                    className="thumb"
                    alt="beer"
                    src={props.beerData.img}
                ></img>

                <h3>{props.beerData.beerName}</h3>

                <a
                    href={
                        props.beerData.breweryContact.url &&
                        props.beerData.breweryContact.url
                    }
                >
                    <h4>{props.beerData.breweryName}</h4>
                </a>

                <h5>ABV: {props.beerData.abv}%</h5>

                <h5 className="description">
                    {props.beerData.beerDescription}
                </h5>

                {props.myBeers && (
                    <>
                        {editRating ? (
                            <div className="set-rating">
                                <div className="set-rating-row-1">
                                    <span>&#127866;</span>
                                    <input
                                        type="number"
                                        max="10"
                                        min="1"
                                        onChange={(e) => {
                                            setRating(+e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <span
                                        onClick={() => {
                                            console.log(props.user.searchType);
                                            props.rateBeer(
                                                props.beerData,
                                                props.user.userData.username,
                                                rating,
                                                props.user.sortType
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
                                    setSelectedBeer(props.beerData);
                                    setEditRating(true);
                                }}
                            >
                                {props.user.loading &&
                                selectedBeer == props.beerData ? (
                                    <ReactLoading
                                        style={center}
                                        type="spin"
                                        color="black"
                                    />
                                ) : (
                                    <span>
                                        &#127866; {props.beerData.stars}
                                    </span>
                                )}
                            </span>
                        )}
                    </>
                )}

                {/* //TODO - add buy button and affiliate <a target="_blank" href={`https://www.beerhawk.co.uk/search/?q=${props.beerData.beerName||props.name}+${props.brewery}`}><span>Buy</span></a> */}
                {/* {props.myBeers && (
                    <span
                        onClick={setState({ confirmDelete: true })}
                        className="delete-beer"
                    >
                        Delete
                    </span>
                )} */}

                {props.myBeers && confirmDelete && (
                    <div className="delete-confirm">
                        <span>Are you sure?</span>
                        <div>
                            <span
                                onClick={() => {
                                    props.deleteBeer({
                                        username: props.user.userData.username,
                                        beerData: props.beerData,
                                    });
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
                {props.myBeers && !confirmDelete && (
                    <span
                        onClick={() => toggleDelete(true)}
                        className="delete-beer"
                    >
                        Remove
                    </span>
                )}

                {/* Bookmark Cell */}
                {props.search && (
                    <span
                        onClick={() => {
                            //only add to favourites if not already included
                            setClickText("Saved");
                            !checkBeerIncluded &&
                                props.user.loggedIn &&
                                props.addBeer({
                                    username: props.user.userData.username,
                                    // brewery: props.brewery,
                                    beerData: props.beerData,
                                });
                        }}
                        className={clickTextStyle + " buttons"}
                    >
                        {props.user.loggedIn && clickText}
                    </span>
                )}
                <span
                    className="more-info"
                    onClick={() => {
                        console.log(height);

                        toggleShowRow(!showRow);
                    }}
                    style={{ padding: "0 0.5em" }}
                >
                    &#x25BC;
                </span>
            </div>
            {/* Style condition prevent initial animation */}
            <div
                ref={targetRef}
                className="more-info-cont"
                style={infoStyle ? infoStyle : { marginBottom: -height }}
            >
                {props.beerData.beerInfo}
            </div>
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
    addBeer,
    rateBeer,
};
export default connect(mapStateToProps, mapActionsToProps)(BeerRow);
