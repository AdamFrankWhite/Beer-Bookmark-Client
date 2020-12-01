import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/userActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeer } from "@fortawesome/free-solid-svg-icons/faBeer";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons/faSignInAlt";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
function NavBar(props) {
    return (
        <header>
            <nav
                className={
                    props.user.colorScheme !== "dark"
                        ? "navbar"
                        : "navbar navbar-dark"
                }
            >
                <Link to="/" className="nav-title">
                    <div className="logo-cont">
                        <img src="/logo.png" alt="BeerBookmark logo" />
                        <div className="text-cont">
                            <h1>Beer</h1>
                            <h2>Bookmark</h2>
                        </div>
                    </div>
                </Link>
                <div className="flex-row">
                    {props.user.loggedIn ? (
                        <Link to="/my-beers" className="link">
                            <div className="flex-col">
                                <FontAwesomeIcon icon={faBeer} />
                                <span className="nav-icon-text">My Beers</span>
                            </div>
                        </Link>
                    ) : null}

                    <Link to="/search" className="link">
                        <div className="flex-col">
                            <FontAwesomeIcon icon={faSearch} />
                            <span className="nav-icon-text">Search</span>
                        </div>
                    </Link>
                    {/* <Link to="/random-beer" className="link">
                        Random Beer
                    </Link> */}
                    {!props.user.loggedIn && (
                        <Link to="/register" className="link">
                            <div className="flex-col">
                                <FontAwesomeIcon icon={faUser} />
                                <span className="nav-icon-text">Register</span>
                            </div>
                        </Link>
                    )}
                    {props.user.loggedIn ? (
                        <Link to="/settings" className="link">
                            <div className="flex-col">
                                <FontAwesomeIcon icon={faUserCircle} />
                                <span className="nav-icon-text">Account</span>
                            </div>
                        </Link>
                    ) : null}
                    <Link to="/login" className="link">
                        {props.user.loggedIn ? (
                            <div className="flex-col">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span
                                    className="nav-icon-text"
                                    onClick={() => props.logout()}
                                >
                                    Logout
                                </span>
                            </div>
                        ) : (
                            <div className="flex-col">
                                <FontAwesomeIcon icon={faSignInAlt} />
                                <span className="nav-icon-text">Login</span>
                            </div>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    logout,
};
export default connect(mapStateToProps, mapActionsToProps)(NavBar);
