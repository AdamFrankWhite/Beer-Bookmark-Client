import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/userActions";
function NavBar(props) {
    return (
        <header>
            <nav className="navbar">
                <Link to="/" className="nav-title">
                    BeerMe
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
