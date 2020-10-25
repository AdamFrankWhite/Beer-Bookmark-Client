import { set } from "mongoose";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addBeer, deleteBeer } from "../redux/actions/userActions";
function BeerRow(props) {
    const checkBeerIncluded =
        props.search && JSON.stringify(props.user.beers).includes(props.id);

    const clickTextStyle = checkBeerIncluded && "click-text-saved";
    const [clickText, setClickText] = useState(
        checkBeerIncluded ? "Saved" : "Add to favourites"
    );
    const [confirmDelete, toggleDelete] = useState(false);

    // checks to see if favourite beers includes this beer, if so render saved

    //FIX CHECK INCLUDED

    return (
        <tr className="beer">
            <td>
                <img className="thumb" alt="beer" src={props.src}></img>
            </td>
            <td>
                <h3>{props.name || props.beerData.beerName}</h3>
            </td>
            <td>
                <a
                    href={
                        props.brewery.contact.url && props.brewery.contact.url
                    }
                >
                    <h4>{props.brewery.brewery_name}</h4>
                </a>
            </td>
            <td>
                <h4>ABV: {props.abv || props.beerData.abv}%</h4>
            </td>
            <td>
                <p className="description">
                    {props.style || props.beerData.beerDescription}
                </p>
            </td>

            <td>
                <span className="buttons">&#127866;{props.beerData.stars}</span>
            </td>

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
};
export default connect(mapStateToProps, mapActionsToProps)(BeerRow);
