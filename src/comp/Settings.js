import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import Privacy from "./Privacy";
import Account from "./Account";
import { connect } from "react-redux";

function Settings(props) {
    return (
        <>
            <h1>Settings</h1>
            <div className="settings-cont">
                {/* <div className="settings-nav"> */}
                <Account />
                <Privacy />
                {/* <nav>
                    <Link to="/settings/account" className="flex-icon">
                        <FontAwesomeIcon icon={faUserCircle} />
                        Account
                    </Link>

                    <Link to="/settings/privacy" className="flex-icon">
                        {" "}
                        <FontAwesomeIcon icon={faCog} />
                        Preferences
                    </Link>
                </nav>
            </div> */}
                {/* <Route path="/settings/account" component={Account} />
            <Route path="/settings/privacy" component={Privacy} /> */}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Settings);
