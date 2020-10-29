import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./comp/NavBar";
import Login from "./comp/Login";
import Register from "./comp/Register";
import Search from "./comp/Search";
import MyBeers from "./comp/MyBeers";
import Home from "./comp/Home";
import Settings from "./comp/Settings";
import "./App.css";

const App = (props) => {
    return (
        <Router>
            <NavBar loggedIn={props.loggedIn} />
            <div
                className={
                    props.user.colorScheme !== "dark"
                        ? "tab-frame"
                        : "tab-frame dark-theme"
                }
            >
                <Route path="/" exact component={Home} />
                {/* Register Route */}
                <Route path="/register" component={Register} />

                {/* Login Route */}
                <Route path="/login" component={Login} />

                {/* My Beers Route */}
                {props.user.loggedIn && (
                    <Route path="/my-beers" component={MyBeers} />
                )}
                {/* Dashboard route*/}
                {props.user.loggedIn && (
                    <Route path="/settings" component={Settings} />
                )}
                {/* Search Route */}
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
