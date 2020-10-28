import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import Privacy from "./Privacy";
import Account from "./Account";
import { connect } from "react-redux";
function Settings(props) {
    return (
        <div className="settings-cont">
            <div className="settings-nav">
                <h1>Settings</h1>
                <nav>
                    <Link to="/settings/account">Account</Link>
                    <Link to="/settings/privacy">Privacy Settings</Link>
                </nav>
            </div>
            <div
                className={
                    props.user.colorScheme == "light"
                        ? "settings-tab"
                        : "settings-tab dark-theme"
                }
            >
                <Route path="/settings/account" component={Account} />
                <Route path="/settings/privacy" component={Privacy} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Settings);
