import React from "react";
import BeerRow from "./BeerRow";
import ReactLoading from "react-loading";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import userReducer from "../redux/reducers/userReducer";
class MyBeers extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            sortType: "asc",
        };
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    render() {
        console.log(this.props);
        const center = { margin: "auto" };
        const beers =
            this.props.user.beers &&
            this.props.user.beers.map((beer) => (
                // <Beer
                //     myBeers={true}
                //     favouriteBeers={this.props.favouriteBeers}
                //     beerData={beer}
                //     src={beer.img}
                //     id={beer._id}
                //     name={beer.name}
                //     abv={beer.abv}
                //     description={beer.description}
                //     addBeer={this.props.addBeer}
                //     deleteBeer={this.props.deleteBeer}
                //     updateBeer={this.props.updateBeer}
                //     brewery={beer.brewery}
                // />
                <BeerRow
                    myBeers={true}
                    favouriteBeers={this.props.user.beers}
                    beerData={beer}
                    src={beer.img}
                    id={beer._id}
                    name={beer.name}
                    abv={beer.abv}
                    description={beer.description}
                    addBeer={this.props.addBeer}
                    deleteBeer={this.props.deleteBeer}
                    updateBeer={this.props.updateBeer}
                    brewery={beer.brewery}
                />
            ));
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
                                this.props.sortBeers(
                                    "beerName",
                                    this.state.sortType
                                );
                                this.setState({
                                    sortType:
                                        this.state.sortType === "asc"
                                            ? "des"
                                            : "asc",
                                });
                            }}
                        >
                            Name
                        </span>
                        <span
                            className="sort-btn"
                            onClick={() => {
                                this.props.sortBeers(
                                    "stars",
                                    this.state.sortType
                                );
                                this.setState({
                                    sortType:
                                        this.state.sortType === "asc"
                                            ? "des"
                                            : "asc",
                                });
                            }}
                        >
                            Top Rated
                        </span>
                    </div>

                    {this.state.isLoading && (
                        <ReactLoading
                            style={center}
                            type="bubbles"
                            color="black"
                            height={400}
                            width={350}
                        />
                    )}
                    <div className="my-beers-cont">
                        {/* <FlipMove> */}
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
                        {/* </FlipMove> */}
                    </div>
                </div>

                {/* <div className="my-breweries-cont">
                    <h1 className="heading">My Favourite Breweries</h1>
                </div> */}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(MyBeers);
