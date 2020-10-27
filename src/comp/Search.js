import React, { useState, useEffect } from "react";
import BeerRow from "./BeerRow";
import Brewery from "./Brewery";
import axios from "axios";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import { searchBeer, getRandomBeers } from "../redux/actions/userActions";
import RandomBeer from "./RandomBeer";
function Search(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const center = { margin: "auto", height: 150, width: 200 };
    const [randomBeerData, setRandomBeerData] = useState(
        props.user.randomBeers
    );
    const [beerType, setBeerType] = useState(["ipa"]);
    // Beer Components

    const beers = props.user.searchResults
        ? props.user.searchResults.map((item) => {
              return <BeerRow search={true} beerData={item} />;
          })
        : [];
    useEffect(() => {
        // https://api.untappd.com/v4/search/beer/?q=${beerType}
        console.log(randomBeerData);
        console.log(props.user.searchResults);
        props.getRandomBeers();
    }, []);

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

                    {/* Random Beers Container */}

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
                            <tbody>
                                {randomBeerData &&
                                    randomBeerData.map((beer) => {
                                        return (
                                            <BeerRow
                                                search={true}
                                                beerData={beer}
                                            />
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
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
    getRandomBeers,
};

export default connect(mapStateToProps, mapActionsToProps)(Search);
