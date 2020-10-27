import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

const RandomBeer = (props) => {
    const checkBeerIncluded = JSON.stringify(props.user.beers).includes(
        props.beerData.beer_slug
    );
    const [clickText, toggleClickText] = useState(
        checkBeerIncluded ? "Saved" : "Add to Favourites"
    );

    const beerTypes = [
        "pale",
        "white",
        "wheat",
        "stout",
        "porter",
        "session",
        "fruit",
    ];
    console.log(props.beerData);

    return (
        // <div>
        //     <div className="random-beer-buttons">
        //         {beerTypes.map((beerType) => (
        //             <span
        //                 className="beer-types"
        //                 // onClick={() => randomBeer(beerType)}
        //             >
        //                 {beerType}
        //             </span>
        //         ))}
        //     </div>
        <tr className="beer">
            {/* Beer Name */}
            {/* Beer picture */}
            <td>
                <img src={props.beerData.beer_label} alt="beer logo"></img>
            </td>
            <td>
                <h4>{props.beerData.beer_name}</h4>
            </td>
            {/* Brewery Name/Link */}
            <td>
                <a
                    href={props.beerData.breweryContact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h5>{props.beerData.breweryName}</h5>
                </a>
            </td>
            {/* Beer ABV
            <td>
                <h5>ABV: {props.beerData.beer_abv}%</h5>
            </td>

            {/* Beer type */}
            <td>
                <h6>{props.beerData.beer_style}</h6>
            </td>
            {/* Beer Description */}
            <td>
                <p className="description">{props.beerData.beer_description}</p>
            </td>
            <td>
                {" "}
                {props.user.loggedIn && (
                    <span
                        className="buttons"
                        onClick={() => {
                            // clickedText();
                            // !checkBeerIncluded &&
                            //     props.user.loggedIn &&
                            //     props.addBeer(
                            //         state.randomBeerData,
                            //         state.randomBeerBrewery
                            //     );
                        }}
                    >
                        {clickText}
                    </span>
                )}
            </td>
        </tr>
        // </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(RandomBeer);
