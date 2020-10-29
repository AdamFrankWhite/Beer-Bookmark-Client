import React, { useState } from "react";
import { connect } from "react-redux";

import ForgotPassword from "./ForgotPassword";
import LoginForm from "./LoginForm";
function Login(props) {
    const [forgotPassword, toggleForgotPassword] = useState(false);
    return (
        <div className="registration">
            {forgotPassword ? (
                <ForgotPassword
                    forgotPassword={forgotPassword}
                    toggleForgotPassword={toggleForgotPassword}
                />
            ) : (
                <LoginForm
                    forgotPassword={forgotPassword}
                    toggleForgotPassword={toggleForgotPassword}
                />
            )}
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
