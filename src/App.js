import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./comp/NavBar";
import Login from "./comp/Login";
import Register from "./comp/Register";
import Search from "./comp/Search";
import MyBeers from "./comp/MyBeers";
import Home from "./comp/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = (props) => {
    return (
        <Router>
            <NavBar loggedIn={props.loggedIn} />
            <div className="tab-frame">
                <Route path="/" exact component={Home} />
                {/* Register Router */}
                <Route path="/register" component={Register} />

                {/* Login Router */}
                <Route path="/login" component={Login} />

                {/* My Beers Router */}
                {props.user.loggedIn && (
                    <Route path="/my-beers" component={MyBeers} />
                )}

                {/* Search Router */}
                <Route path="/search" component={Search} />
            </div>
        </Router>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(App);
