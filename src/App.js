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
import NewPassword from "./comp/NewPassword";
import ForgotPassword from "./comp/ForgotPassword";
import Footer from "./comp/Footer";
import Brewery from "./comp/Brewery";
import "./App.css";
import Modal from "./comp/Modal";

const App = (props) => {
    return (
        <Router>
            {props.user.showModal && <Modal />}
            <NavBar loggedIn={props.loggedIn} />

            <div
                className={
                    props.user.colorScheme !== "dark"
                        ? "tab-frame"
                        : "tab-frame dark-theme"
                }
            >
                <Route path="/" exact component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                {props.user.brewery && (
                    <Route
                        path={`/brewery/${props.user.brewery.brewery_slug}`}
                        brewery={props.user.brewery}
                        component={Brewery}
                    />
                )}
                {props.user.loggedIn && (
                    <Route path="/my-beers" component={MyBeers} />
                )}
                {props.user.loggedIn && (
                    <Route path="/settings" component={Settings} />
                )}
                <Route path="/search" component={Search} />

                {/* Password Reset Route */}
                <Route path="/reset" component={NewPassword} />
                <Route path="/forgot" component={ForgotPassword} />
            </div>
            <Footer />
        </Router>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(App);
