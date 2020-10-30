import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import Privacy from "./Privacy";
import Account from "./Account";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
function Settings(props) {
    return (
        <div className="settings-cont">
            <div className="settings-nav">
                <h1>Settings</h1>
                <nav>
                    <Link to="/settings/account" className="flex-icon">
                        <FontAwesomeIcon icon={faUserCircle} />
                        Account
                    </Link>

                    <Link to="/settings/privacy" className="flex-icon">
                        {" "}
                        <FontAwesomeIcon icon={faCog} />
                        Privacy Settings
                    </Link>
                </nav>
            </div>
            <Route path="/settings/account" component={Account} />
            <Route path="/settings/privacy" component={Privacy} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Settings);
