import React, { useState } from "react";
import BeerRow from "./BeerRow";
import Brewery from "./Brewery";
import axios from "axios";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import { searchBeer } from "../redux/actions/userActions";
function Search(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const center = { margin: "auto", height: 150, width: 200 };

    // Beer Components
    const beers = props.user.searchResults.map((item) => {
        return (
            <BeerRow
                search={true}
                src={item.beer.beer_label}
                id={item.beer.bid}
                name={item.beer.beer_name}
                abv={item.beer.beer_abv}
                style={item.beer.beer_style}
                description={item.beer.beer_description}
                beerData={item.beer}
                // favouriteBeers={this.props.favouriteBeers}
                // addBeer={this.props.addBeer}
                brewery={item.brewery}
            />
        );
    });

    // Brewery Components
    // const breweries = breweryData.map((item) => (
    //     <Brewery
    //         img={item.brewery.brewery_label}
    //         name={item.brewery.brewery_name}
    //         location={item.brewery.location.brewery_city}
    //         beerNum={item.brewery.beer_count}
    //     />
    // ));
    return (
        <div className="App">
            {/* Loading animation */}
            {props.user.loading && (
                <ReactLoading style={center} type="bubbles" color="black" />
            )}

            {/* Loaded  */}
            {!props.user.loading && (
                <div>
                    <p>
                        Can't quite remember that awesome beer you had last
                        night? Bookmark it with BeerMe
                    </p>

                    {/* Search Box */}
                    <label htmlFor="searchTerm">
                        Search:
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            name="searchTerm"
                        ></input>
                    </label>
                    <button onClick={() => props.searchBeer(searchTerm)}>
                        Go
                    </button>
                    <br></br>
                    {/* <label htmlFor="searchType">Beer: 
                        <input name="searchType" type="radio" value="beer" onChange={this.props.handleChange}></input>
                    </label>
                    <label htmlFor="searchType">Brewery: 
                        <input name="searchType" type="radio" value="brewery" onChange={this.props.handleChange}></input>
                    </label> */}

                    {/* Beer Container */}
                    <div className="beer-container">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{beers}</tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    searchBeer,
};

export default connect(mapStateToProps, mapActionsToProps)(Search);
