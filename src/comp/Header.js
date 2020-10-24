import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header>
            <nav className="navbar navbar-dark bg-primary">
                <a className="navbar-brand nav-title" href="/">
                    BeerMe
                </a>
                <div>
                    {props.loggedIn ? (
                        <Link to="/my-beers" className="link">
                            My Beers
                        </Link>
                    ) : null}
                    <Link to="/search" className="link">
                        Search
                    </Link>
                    <Link to="/random-beer" className="link">
                        Random Beer
                    </Link>
                    {!props.loggedIn && (
                        <Link to="/register" className="link">
                            Register
                        </Link>
                    )}
                    <Link to="/login" className="link">
                        {props.loggedIn ? (
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

export default Header;
