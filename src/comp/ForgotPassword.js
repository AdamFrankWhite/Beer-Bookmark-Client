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
        <div>
            <p>Reset Password</p>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => props.resetPassword(email)}>Reset</button>
            <p>{errorMessage}</p>
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
