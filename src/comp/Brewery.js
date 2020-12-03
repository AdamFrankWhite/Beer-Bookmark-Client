import Axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BeerRow from "./BeerRow";
import SortButton from "./SortButton";
import { sortSearchResults } from "../redux/actions/userActions";
function Brewery({ user, sortSearchResults }) {
    const [brewerBeers, setBrewerBeers] = useState(null);

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
        const sortedBeers = sortBeers(user.searchResults, orderType, orderAsc);
        setBrewerBeers(sortedBeers);
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
                console.log(res.data.response.beers.items);
                setBrewerBeers(cleanData);
            })

            .catch((err) => console.log(err));
    }, []);
    console.log(user.brewery);

    const sortBeers = (beers, searchType, orderAsc) => (dispatch) => {
        let sortedBeers;

        if (orderAsc) {
            sortedBeers = beers.sort((a, b) =>
                a[searchType] > b[searchType]
                    ? 1
                    : b[searchType] > a[searchType]
                    ? -1
                    : 0
            );
        } else {
            sortedBeers = beers.sort((a, b) =>
                a[searchType] < b[searchType]
                    ? 1
                    : b[searchType] < a[searchType]
                    ? -1
                    : 0
            );
        }
        return sortedBeers;
    };
    return (
        <div className="brewery-cont">
            <img src={user.brewery.brewery_label} alt="brewery" />
            <h2>Brewery: {user.brewery.brewery_name} </h2>
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
                {brewerBeers &&
                    brewerBeers.map((beer) => (
                        <BeerRow search={true} beerData={beer} />
                    ))}
            </div>
            <h2>Beers: {user.beerNum}</h2>
            <h2>Type: {user.brewery.brewery_type}</h2>
            <h2>
                Location: {user.brewery.location.brewery_city},{" "}
                {user.brewery.country_name}
            </h2>
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
};

export default connect(mapStateToProps, mapActionsToProps)(Brewery);
