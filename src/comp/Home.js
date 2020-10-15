import React from "react";
import { NavLink } from "react-router-dom";
export default function Home() {
    return (
        <div className="home">
            <div className="banner">
                <div className="banner-cont">
                    <h1>BeerMe</h1>
                    <h2>Your favourite beer bookmark app</h2>
                    <NavLink to="/register">
                        <span className="button mr-2">Signup</span>
                    </NavLink>
                    <NavLink to="/login">
                        <span className="button">Login</span>
                    </NavLink>
                </div>
            </div>
            <div className="home-description">
                <p>
                    Struggling to remember that awesome beer you had last night?
                    Well, forget no more with BeerBookmark - the easy way to
                    catalogue your favourite beers.{" "}
                </p>
            </div>
            <h2>Features</h2>
            <hr />
            <div className="features">
                <div className="feature-card">
                    <img src="/icons/icons8-star-80.png" alt="bookmark" />
                    <h3>Bookmark</h3>
                    <p>
                        Struggling to remember that awesome beer you had last
                        night? Struggle no more - bookmark that beer for the
                        morning after.
                    </p>
                </div>
                <div className="feature-card">
                    <img src="/icons/icons8-beer-80.png" alt="discover" />
                    <h3>Discover</h3>
                    <p>Want to try something new? </p>
                </div>
                <div className="feature-card">
                    <img src="/icons/icons8-team-80.png" alt="share" />
                    <h3>Share</h3>
                    <p>
                        Think your friend would love that amazing hoppy IPA you
                        had last night? Let them know. Wonder what your friends
                        are drinking? Check them out.
                    </p>
                </div>
            </div>
        </div>
    );
}
