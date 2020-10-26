import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import NavBar from "./comp/NavBar";
import Login from "./comp/Login";
import Register from "./comp/Register";
import Search from "./comp/Search";
import RandomBeer from "./comp/RandomBeer";
import MyBeers from "./comp/MyBeers";
import Home from "./comp/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            regUsername: "",
            regPassword: "",
            regEmail: "",
            regRepeatPassword: "",
            loggedIn: window.localStorage.access_token ? true : false,
            currentUser: "",
            username: "",
            password: "",
            showError: false,
            errorMessage: "",
            regErrors: {
                usernameLengthError: false,
                emailError: false,
                passwordLengthError: false,
                passwordMatchError: false,
            },
            beerData: [],
            breweryData: [],
            favouriteBeers: [],
            redirect: "",
            deployment: "dev",
        };
        this.baseUrl =
            this.state.deployment === "production"
                ? "https://fierce-plateau-38188.herokuapp.com"
                : "http://localhost:5000";
        // this.addBeer = this.addBeer.bind(this);
        // this.deleteBeer = this.deleteBeer.bind(this);
        // this.login = this.login.bind(this);
        // this.logout = this.logout.bind(this);
        // this.register = this.register.bind(this);
        // this.validation = this.validation.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.searchBeer = this.searchBeer.bind(this);
        this.sortBeers = this.sortBeers.bind(this);
        // this.changeTab = this.changeTab.bind(this);
        this.updateBeer = this.updateBeer.bind(this);
    }

    // Update Beer Rating
    updateBeer(beer, rating) {
        let updateData = {
            beerData: beer,
            username: this.state.username,
            newRating: rating,
        };
        console.log(beer.stars);
        axios
            .put(`${this.baseUrl}/users/my-beers/update`, updateData)
            .then((res) => {
                this.setState({ favouriteBeers: res.data });
            });
    }

    renderRedirect() {
        if (this.props.user.redirect === "login") {
            return <Redirect to="/login" />;
        } else if (this.props.user.redirect === "my-beers") {
            return <Redirect to="/my-beers" />;
        }
    }

    // handleChange(e) {
    //     // Update form fields and validation
    //     let changeType = e.target.name;
    //     this.setState({ [changeType]: e.target.value }, () => {
    //         this.validation(changeType);
    //     });
    // }

    sortBeers(searchType, order) {
        let sortedBeers;
        if (searchType === "beerName") {
            if (order === "asc") {
                sortedBeers = this.state.favouriteBeers.sort((a, b) =>
                    a[searchType] > b[searchType]
                        ? 1
                        : b[searchType] > a[searchType]
                        ? -1
                        : 0
                );
            } else {
                sortedBeers = this.state.favouriteBeers.sort((a, b) =>
                    a[searchType] < b[searchType]
                        ? 1
                        : b[searchType] < a[searchType]
                        ? -1
                        : 0
                );
            }
        } else if (searchType === "stars") {
            if (order === "asc") {
                sortedBeers = this.state.favouriteBeers.sort((a, b) =>
                    a[searchType] < b[searchType]
                        ? 1
                        : b[searchType] < a[searchType]
                        ? -1
                        : 0
                );
            } else {
                sortedBeers = this.state.favouriteBeers.sort((a, b) =>
                    a[searchType] > b[searchType]
                        ? 1
                        : b[searchType] > a[searchType]
                        ? -1
                        : 0
                );
            }
        }

        this.setState({ favouriteBeers: sortedBeers });
        console.log(sortedBeers);
    }

    // changeTab(selectedTab) {
    //     this.setState({ searchType: selectedTab });
    // }
    render() {
        return (
            <Router>
                <NavBar loggedIn={this.state.loggedIn} logout={this.logout} />
                {this.renderRedirect()}
                <div className="tab-frame">
                    <Route path="/" exact component={Home} />
                    {/* Register Router */}
                    <Route
                        path="/register"
                        render={(routeProps) => (
                            <Register
                                {...routeProps}
                                register={this.register}
                                email={this.state.regEmail}
                                handleChange={this.handleChange}
                                username={this.state.regUsername}
                                password={this.state.regPassword}
                                repeatPassword={this.state.regRepeatPassword}
                                errorMessage={this.state.errorMessage}
                                regErrors={this.state.regErrors}
                                validation={this.validation}
                            />
                        )}
                    />

                    {/* Login Router */}
                    <Route
                        path="/login"
                        render={(routeProps) => (
                            <Login
                                {...routeProps}
                                // login={this.login}
                                // handleChange={this.handleChange}
                                // username={this.state.username}
                                // password={this.state.password}
                                // loading={this.state.loading}
                                // loggedIn={this.state.loggedIn}
                                showError={this.state.showError}
                                errorMessage={this.state.errorMessage}
                            />
                        )}
                    />

                    {/* My Beers Router */}
                    {this.props.user.loggedIn && (
                        <Route
                            path="/my-beers"
                            render={(routeProps) => (
                                <MyBeers
                                    {...routeProps}
                                    addBeer={this.addBeer}
                                    // deleteBeer={this.deleteBeer}
                                    updateBeer={this.updateBeer}
                                    searchTerm={this.state.searchTerm}
                                    handleChange={this.handleChange}
                                    // username={this.state.username}
                                    sortBeers={this.sortBeers}
                                />
                            )}
                        />
                    )}

                    {/* Search Router */}
                    <Route
                        path="/search"
                        render={(routeProps) => (
                            <Search
                                {...routeProps}
                                beerData={this.state.beerData}
                                breweryData={this.state.breweryData}
                                favouriteBeers={this.state.favouriteBeers}
                                addBeer={this.addBeer}
                                searchTerm={this.state.searchTerm}
                                searchType={this.state.searchType}
                                handleChange={this.handleChange}
                                searchBeer={this.searchBeer}
                                loggedIn={this.state.loggedIn}
                                changeTab={this.changeTab}
                            />
                        )}
                    />

                    {/* Random Beer Router */}
                    {/* <Route
                        path="/random-beer"
                        render={(routeProps) => (
                            <RandomBeer
                                {...routeProps}
                                handleChange={this.handleChange}
                                addBeer={this.addBeer}
                                loggedIn={this.state.loggedIn}
                                favouriteBeers={this.state.favouriteBeers}
                            />
                        )}
                    /> */}
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(App);
