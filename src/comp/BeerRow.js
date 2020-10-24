import React from "react";

class BeerRow extends React.Component {
    constructor() {
        super();
        this.state = {
            clickText: "Add to favourites",
            confirmDelete: false,
        };
        this.clickedText = this.clickedText.bind(this);
    }

    clickedText() {
        this.setState({ clickText: "Saved" });
    }

    render() {
        // checks to see if favourite beers includes this beer, if so render saved
        console.log(this.state.confirmDelete);
        const checkBeerIncluded =
            this.props.search &&
            JSON.stringify(this.props.favouriteBeers).includes(this.props.id);
        const clickText = checkBeerIncluded ? "Saved" : "Add to Favourites";
        const clickTextStyle = checkBeerIncluded && "click-text-saved";
        const stars = [];

        // // stars
        // for (let i = 0; i < this.props.beerData.stars; i++) {
        //     stars.push(
        //         <span role="img" aria-label="star">
        //             &#11088;
        //         </span>
        //     );
        // }
        // console.log(window.localStorage.getItem("access_token"));
        return (
            <tr className="beer">
                <td>
                    <img
                        className="thumb"
                        alt="beer"
                        src={this.props.src}
                    ></img>
                </td>
                <td>
                    <h3>{this.props.name || this.props.beerData.beerName}</h3>
                </td>
                <td>
                    <a
                        href={
                            this.props.brewery.contact.url &&
                            this.props.brewery.contact.url
                        }
                    >
                        <h4>{this.props.brewery.brewery_name}</h4>
                    </a>
                </td>
                <td>
                    <h4>ABV: {this.props.abv || this.props.beerData.abv}%</h4>
                </td>
                <td>
                    <p className="description">
                        {this.props.style ||
                            this.props.beerData.beerDescription}
                    </p>
                </td>

                <td>
                    <span className="buttons">
                        &#127866;{this.props.beerData.stars}
                    </span>
                </td>

                {/* {this.props.myBeers && (
                    <span className="ratings">
                        Rate:
                        <span
                            onClick={() =>
                                this.props.updateBeer(this.props.beerData, 1)
                            }
                        >
                            1
                        </span>
                        <span
                            onClick={() =>
                                this.props.updateBeer(this.props.beerData, 2)
                            }
                        >
                            2
                        </span>
                        <span
                            onClick={() =>
                                this.props.updateBeer(this.props.beerData, 3)
                            }
                        >
                            3
                        </span>
                        <span
                            onClick={() =>
                                this.props.updateBeer(this.props.beerData, 4)
                            }
                        >
                            4
                        </span>
                        <span
                            onClick={() =>
                                this.props.updateBeer(this.props.beerData, 5)
                            }
                        >
                            5
                        </span>
                    </span>
                )} */}

                {/* //TODO - add buy button and affiliate <a target="_blank" href={`https://www.beerhawk.co.uk/search/?q=${this.props.beerData.beerName||this.props.name}+${this.props.brewery}`}><span>Buy</span></a> */}
                {/* {this.props.myBeers && (
                    <span
                        onClick={this.setState({ confirmDelete: true })}
                        className="delete-beer"
                    >
                        Delete
                    </span>
                )} */}
                {this.props.myBeers && this.state.confirmDelete ? (
                    <td>
                        <div className="delete-confirm">
                            <span>Are you sure?</span>
                            <div>
                                <span
                                    onClick={() => {
                                        this.props.deleteBeer(
                                            this.props.beerData
                                        );
                                        this.setState({
                                            confirmDelete: false,
                                        });
                                    }}
                                    className="delete-beer"
                                >
                                    Yes
                                </span>
                                <span
                                    onClick={() => {
                                        this.setState({
                                            confirmDelete: false,
                                        });
                                    }}
                                    className="delete-beer"
                                >
                                    No
                                </span>
                            </div>
                        </div>
                    </td>
                ) : (
                    <td>
                        <span
                            onClick={() =>
                                this.setState({ confirmDelete: true })
                            }
                            className="delete-beer"
                        >
                            Remove
                        </span>
                    </td>
                )}

                {this.props.search && (
                    <td>
                        <span
                            onClick={() => {
                                console.log(this.props.brewery);
                                //only add to favourites if not already included
                                this.clickedText();
                                !checkBeerIncluded &&
                                    this.props.loggedIn &&
                                    this.props.addBeer(
                                        this.props.beerData,
                                        this.props.brewery
                                    );
                            }}
                            className={clickTextStyle + " buttons"}
                        >
                            {this.props.loggedIn && clickText}
                        </span>
                    </td>
                )}

                {/* {!this.props.myBeers && <p>Details</p>} // TODO - add modal window with beer details */}
            </tr>
        );
    }
}

export default BeerRow;
