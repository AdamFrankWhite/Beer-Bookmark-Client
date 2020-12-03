import React from "react";
import { connect } from "react-redux";
function Brewery({ user }) {
    console.log(user.brewery);
    return (
        <div>
            <img src={user.brewery.brewery_label} alt="brewery" />
            <h2>Brewery: {user.brewery.brewery_name} </h2>
            {/* 
            Need to search for beers by exact brewery
            <h2>Beers: {user.beerNum}</h2> */}
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

export default connect(mapStateToProps)(Brewery);
