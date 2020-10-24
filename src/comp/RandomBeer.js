import React from "react";
import axios from "axios";

class RandomBeer extends React.Component {
    constructor() {
        super();
        this.state = {
            randomBeerData: [],
            randomBeerBrewery: { name: "", url: "" }, // needed to avoid nested rendering bug
            clickText: "Add to favourites",
        };
        this.randomBeer = this.randomBeer.bind(this);
        this.clickedText = this.clickedText.bind(this);
    }

    clickedText() {
        this.setState({ clickText: "Saved" });
    }
    componentDidMount() {
        const randomBeer = Math.floor(Math.random() * 15000);

        // search by ID
        axios
            .get(`https://api.untappd.com/v4/beer/info/${randomBeer}`, {
                params: {
                    client_id: "F94775549BAC795E436858A50A3616690D3CD446",
                    client_secret: "844CF3E397DB0294FC89ACE34560918CAFD035FB",
                },
            })
            .then((res) => {
                let breweryData = res.data.response.beer.brewery;
                this.setState({
                    randomBeerData: res.data.response.beer,
                    randomBeerBrewery: breweryData,
                });
            });
    }

    randomBeer(beerType) {
        axios
            .get(`https://api.untappd.com/v4/search/beer/?q=${beerType}`, {
                params: {
                    client_id: "F94775549BAC795E436858A50A3616690D3CD446",
                    client_secret: "844CF3E397DB0294FC89ACE34560918CAFD035FB",
                },
            })
            .then((res) => {
                const randomNum = Math.floor(
                    Math.random() * res.data.response.beers.count
                );
                const breweryData =
                    res.data.response.beers.items[randomNum].brewery;

                console.log(res.data.response.beers.items[randomNum].beer);
                this.setState({
                    randomBeerData:
                        res.data.response.beers.items[randomNum].beer,
                    randomBeerBrewery: breweryData,
                });
            });
    }
    render() {
        const beerTypes = [
            "pale",
            "white",
            "wheat",
            "stout",
            "porter",
            "session",
            "fruit",
        ];

        const checkBeerIncluded = JSON.stringify(
            this.props.favouriteBeers
        ).includes(this.state.randomBeerData.beer_name);
        const clickText = checkBeerIncluded ? "Saved" : "Add to Favourites";
        return (
            <div>
                <div className="random-beer-buttons">
                    {beerTypes.map((beerType) => (
                        <span
                            className="beer-types"
                            onClick={() => this.randomBeer(beerType)}
                        >
                            {beerType}
                        </span>
                    ))}
                </div>
                <div className="randomBeer">
                    {this.props.loggedIn && (
                        <span
                            className="buttons"
                            onClick={() => {
                                this.clickedText();
                                console.log(this.state.randomBeerData);
                                !checkBeerIncluded &&
                                    this.props.loggedIn &&
                                    this.props.addBeer(
                                        this.state.randomBeerData,
                                        this.state.randomBeerBrewery
                                    );
                            }}
                        >
                            {clickText}
                        </span>
                    )}
                    <br></br>

                    <br></br>
                    {/* Beer Name */}
                    <h4>{this.state.randomBeerData.beer_name}</h4>
                    {/* Brewery Name/Link */}
                    <a
                        href={this.state.randomBeerBrewery.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h5>{this.state.randomBeerBrewery.name}</h5>
                    </a>
                    {/* Beer picture */}
                    <img
                        src={this.state.randomBeerData.beer_label}
                        alt="beer logo"
                    ></img>
                    {/* Beer ABV */}
                    <h5>ABV: {this.state.randomBeerData.beer_abv}%</h5>
                    {/* Beer type */}
                    <h6>{this.state.randomBeerData.beer_style}</h6>
                    {/* Beer Description */}
                    <p className="description">
                        {this.state.randomBeerData.beer_description}
                    </p>
                </div>
            </div>
        );
    }
}

export default RandomBeer;
