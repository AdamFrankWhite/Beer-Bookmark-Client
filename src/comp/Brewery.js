import Axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BeerRow from "./BeerRow";
import SortButton from "./SortButton";
import {
    sortSearchResults,
    setBrewerBeers,
} from "../redux/actions/userActions";
function Brewery({ user, sortSearchResults, setBrewerBeers }) {
    const sortTypes = [
        { name: "Beer", type: "beerName" },
        { name: "Brewer", type: "breweryName" },
        { name: "ABV", type: "abv" },
        { name: "Type", type: "beerDescription" },
    ];
    const checkHover = (type) => {
        return (hover == type && user.searchSortType.searchType !== type) ||
            user.searchSortType.searchType == type
            ? "black"
            : "gray";
    };
    const [orderAsc, setOrderAsc] = useState(false);
    const setOrder = (type) => {
        setOrderType(type);
        setOrderAsc(user.searchSortType.searchType == type ? !orderAsc : true);
    };
    const [hover, toggleHover] = useState("");
    const [orderType, setOrderType] = useState("");
    useEffect(() => {
        console.log(user.searchResults, orderType, orderAsc);
        sortSearchResults(user.brewerBeers, orderType, orderAsc);
    }, [orderType, orderAsc]);
    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(
                `https://api.untappd.com/v4/search/beer/?q=${user.brewery.brewery_name}`,
                {
                    params: {
                        client_id: "F94775549BAC795E436858A50A3616690D3CD446",
                        client_secret:
                            "844CF3E397DB0294FC89ACE34560918CAFD035FB",
                    },
                }
            )
            .then((res) => {
                const cleanData = res.data.response.beers.items.map((item) => {
                    return {
                        id: item.beer.bid,
                        beerName: item.beer.beer_name,
                        abv: item.beer.beer_abv,
                        beerDescription: item.beer.beer_style,
                        brewery: item.brewery,
                        img: item.beer.beer_label,
                        beerInfo: item.beer.beer_description,
                    };
                });

                //Check brewer name
                const filterBrewer = cleanData.filter((beer) => {
                    return (
                        beer.brewery.brewery_name == user.brewery.brewery_name
                    );
                });

                setBrewerBeers(filterBrewer);
            })

            .catch((err) => console.log(err));
    }, []);
    console.log(user.brewery);

    return (
        <div className="brewery-cont">
            <img src={user.brewery.brewery_label} alt="brewery" />
            <h2>Brewery: {user.brewery.brewery_name} </h2>

            <h2>Type: {user.brewery.brewery_type}</h2>
            <h2>
                Location: {user.brewery.location.brewery_city},{" "}
                {user.brewery.country_name}
            </h2>
            <h2>Beers: {user.beerNum}</h2>
            <div
                className={
                    user.colorScheme !== "dark"
                        ? "sort-btn-group sort-btns-light"
                        : "sort-btn-group sort-btns-dark"
                }
            >
                <span className="blank-col">Sort by: </span>
                {sortTypes.map((sortType) => (
                    <SortButton
                        name={sortType.name}
                        sortType={sortType.type}
                        toggleHover={toggleHover}
                        checkHover={checkHover}
                        setOrder={setOrder}
                    />
                ))}
            </div>
            <div className="beers-cont">
                {user.brewerBeers &&
                    user.brewerBeers.map((beer) => (
                        <BeerRow search={true} beerData={beer} />
                    ))}
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    sortSearchResults,
    setBrewerBeers,
};

export default connect(mapStateToProps, mapActionsToProps)(Brewery);
