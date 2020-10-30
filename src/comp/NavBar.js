import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/userActions";
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
                <div>
                    {props.user.loggedIn ? (
                        <Link to="/my-beers" className="link">
                            My Beers
                        </Link>
                    ) : null}

                    <Link to="/search" className="link">
                        Search
                    </Link>
                    {/* <Link to="/random-beer" className="link">
                        Random Beer
                    </Link> */}
                    {!props.user.loggedIn && (
                        <Link to="/register" className="link">
                            Register
                        </Link>
                    )}
                    {props.user.loggedIn ? (
                        <Link to="/settings" className="link">
                            Settings
                        </Link>
                    ) : null}
                    <Link to="/login" className="link">
                        {props.user.loggedIn ? (
                            <span onClick={() => props.logout()}>Logout</span>
                        ) : (
                            <span>Login</span>
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
