import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetPassword } from "../redux/actions/userActions";
function ForgotPassword(props) {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        props.user.resetEmailMessage
            ? setErrorMessage(props.user.resetEmailMessage)
            : setErrorMessage("");
    }, [props.user.resetEmailMessage]);
    return (
        <div className="reset-pass-cont">
            <h2>Reset Password</h2>
            <label htmlFor="email">Email</label>
            <div className="row">
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <input
                type="submit"
                value="Send Link"
                className="button"
                onClick={() => props.resetPassword(email)}
            />
            <p
                className={errorMessage ? "forget-error" : ""}
                style={
                    errorMessage != "Email not found"
                        ? { background: "rgba(91,189,0, 0.6)", color: "white" }
                        : {}
                }
            >
                {errorMessage}
            </p>
            <Link to="/login">Back to login</Link>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    resetPassword,
};
export default connect(mapStateToProps, mapActionsToProps)(ForgotPassword);
