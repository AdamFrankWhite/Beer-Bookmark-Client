import React, { useState } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import ForgotPassword from "./ForgotPassword";
import LoginForm from "./LoginForm";
function Login(props) {
    return (
        <div className="registration">
            <LoginForm />
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(Login);
