import React from "react";

export default function Footer() {
    return (
        <footer>
            <div className="footer-cont">
                <div className="about">
                    <div className="logo-cont">
                        <img src="images/logo.png" alt="BeerBookmark logo" />
                        <div className="text-cont">
                            <h1>Beer</h1>
                            <h2>Bookmark</h2>
                        </div>
                    </div>
                    <p>
                        BeerBookmark is a bookmarking app for beer and cider
                        lovers. Keep your favourite beers, ratings and comments
                        in a single place.
                    </p>
                </div>
                <div className="links">
                    <h3>Links</h3>
                    <ul>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="subscribe">
                    <h3>Subscribe</h3>
                    <ul>
                        <li>Sign Up</li>
                        <li>App</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
