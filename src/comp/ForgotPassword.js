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
        <form
            className="reset-pass-cont"
            OnSubmit={() => props.resetPassword(email)}
        >
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
            <input type="submit" value="Send Link" className="button" />
            <p>{errorMessage}</p>
            <Link to="/login">Back to login</Link>
        </form>
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
