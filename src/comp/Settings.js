import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import Privacy from "./Privacy";
import Account from "./Account";
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
            <div className="settings-tab">
                <Route path="/settings/account" component={Account} />
                <Route path="/settings/privacy" component={Privacy} />
            </div>
        </div>
    );
}

export default Settings;
