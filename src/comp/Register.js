import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../redux/actions/userActions";
function Register(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    //Validation
    useEffect(() => {
        console.log(formErrors);
    }, [formErrors]);
    const validatePassword = () => {
        let errors = {};

        //Form validation
        username.length < 6 && (errors.usernameLengthError = true);

        email.length < 6 && (errors.emailLengthError = true);
        !email.includes("@") && (errors.emailError = true);

        password.length < 8 && (errors.passwordLengthError = true);

        password !== confirmPassword && (errors.passwordMatchError = true);

        //Check errors obj is empty
        if (Object.keys(errors).length === 0 && errors.constructor === Object) {
            console.log(username, email, password);
            props.register({ username, email, password });
        } else {
            setFormErrors(errors);
        }
    };

    const handleSubmit = (e) => {
        console.log("ba");
        e.preventDefault();
        validatePassword();
    };
    return (
        <form className="registration" onSubmit={handleSubmit} noValidate>
            <div className="login-head">
                <img src="images/register.png" alt="login" />
                <h2>Register</h2>
            </div>
            {/* Username field */}
            <div className="row">
                <label htmlFor="regUsername">Username: </label>
                <input
                    id="regUsername"
                    name="regUsername"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                {/* Conditional style based on error boolean and success */}
                {formErrors.usernameLengthError && (
                    <p className="errorMessage">
                        {formErrors.usernameLengthError &&
                            window.innerWidth > 600 &&
                            "Username must be at least 6 characters"}
                    </p>
                )}
            </div>
            {/* Email field */}
            <div className="row">
                <label htmlFor="regEmail">Email:</label>
                <input
                    id="regEmail"
                    name="regEmail"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                {formErrors.emailError && (
                    <p className="errorMessage">
                        {formErrors.emailError &&
                            window.innerWidth > 1200 &&
                            "Invalid email. Please try again"}
                    </p>
                )}
                {formErrors.emailLengthError && (
                    <p className="errorMessage">
                        {formErrors.emailError &&
                            window.innerWidth > 1200 &&
                            "Email address too short"}
                    </p>
                )}
            </div>
            {/* Password field */}
            <div className="row">
                <label htmlFor="regPassword">Password: </label>
                <input
                    id="regPassword"
                    name="regPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                {formErrors.passwordLengthError && (
                    <p className="errorMessage">
                        "Password must be at least 8 characters"
                    </p>
                )}
            </div>
            {/* Repeat Password field */}
            <div className="row">
                <label htmlFor="confirmPassword">Repeat Password:</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                {formErrors.passwordMatchError && (
                    <p className="errorMessage">"Passwords do not match"</p>
                )}
            </div>
            <br />
            <input className="button" type="submit" value="Register" />{" "}
            {props.user.loggedIn && props.user.beers.length > 0 && (
                <Redirect to="my-beers" />
            )}
            {props.user.loggedIn && props.user.beers.length == 0 && (
                <Redirect to="search" />
            )}
        </form>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
const mapActionsToProps = {
    register,
};
export default connect(mapStateToProps, mapActionsToProps)(Register);
