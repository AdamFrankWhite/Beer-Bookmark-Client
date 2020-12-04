import React, { useState } from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import Privacy from "./Privacy";
import Theme from "./Theme";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import Settings from "./Settings";
import Profile from "./Profile";
function Account(props) {
    return (
        <>
            <div className="settings-cont">
                {/* <div className="settings-nav"> */}
                <Sidebar />
                <Route path="/account/settings" component={Settings} />
                <Route path="/account/profile" component={Profile} />
                <Route path="/account/theme" component={Theme} />
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Account);
