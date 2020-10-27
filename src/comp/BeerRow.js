import React, { useState, useRef } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import { addBeer, deleteBeer, rateBeer } from "../redux/actions/userActions";
function BeerRow(props) {
    const checkBeerIncluded =
        props.search && JSON.stringify(props.user.beers).includes(props.id);
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

    return (
        <tr className="beer">
            <td>
                <img
                    className="thumb"
                    alt="beer"
                    src={props.beerData.img}
                ></img>
            </td>
            <td>
                <h3>{props.beerData.beerName}</h3>
            </td>
            <td>
                <a
                    href={
                        props.beerData.breweryContact.url &&
                        props.beerData.breweryContact.url
                    }
                >
                    <h4>{props.beerData.breweryName}</h4>
                </a>
            </td>
            <td>
                <h5>ABV: {props.beerData.abv}%</h5>
            </td>
            <td>
                <h5 className="description">
                    {props.beerData.beerDescription}
                </h5>
            </td>

            {props.myBeers && (
                <td>
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
                                        props.rateBeer(
                                            props.beerData,
                                            props.user.userData.username,
                                            rating
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
                                <span>&#127866; {props.beerData.stars}</span>
                            )}
                        </span>
                    )}
                </td>
            )}

            {/* {props.myBeers && (
                    <span className="ratings">
                        Rate:
                        <span
                            onClick={() =>
                                props.updateBeer(props.beerData, 1)
                            }
                        >
                            1
                        </span>
                        <span
                            onClick={() =>
                                props.updateBeer(props.beerData, 2)
                            }
                        >
                            2
                        </span>
                        <span
                            onClick={() =>
                                props.updateBeer(props.beerData, 3)
                            }
                        >
                            3
                        </span>
                        <span
                            onClick={() =>
                                props.updateBeer(props.beerData, 4)
                            }
                        >
                            4
                        </span>
                        <span
                            onClick={() =>
                                props.updateBeer(props.beerData, 5)
                            }
                        >
                            5
                        </span>
                    </span>
                )} */}

            {/* //TODO - add buy button and affiliate <a target="_blank" href={`https://www.beerhawk.co.uk/search/?q=${props.beerData.beerName||props.name}+${props.brewery}`}><span>Buy</span></a> */}
            {/* {props.myBeers && (
                    <span
                        onClick={setState({ confirmDelete: true })}
                        className="delete-beer"
                    >
                        Delete
                    </span>
                )} */}
            <td>
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
            </td>
            {/* Bookmark Cell */}
            {props.search && (
                <td>
                    <span
                        onClick={() => {
                            //only add to favourites if not already included
                            setClickText("Saved");
                            !checkBeerIncluded &&
                                props.user.loggedIn &&
                                props.addBeer({
                                    username: props.user.userData.username,
                                    brewery: props.brewery,
                                    beerData: props.beerData,
                                });
                        }}
                        className={clickTextStyle + " buttons"}
                    >
                        {props.user.loggedIn && clickText}
                    </span>
                </td>
            )}

            {/* {!props.myBeers && <p>Details</p>} // TODO - add modal window with beer details */}
        </tr>
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
