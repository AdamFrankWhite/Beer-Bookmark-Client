import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../redux/actions/userActions";
function Register(props) {
    let errors = props.regErrors;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        console.log("ba");
        e.preventDefault();
        props.register({ username, email, password });
    };
    return (
        <form className="registration" onSubmit={handleSubmit}>
            <h2>Register</h2>
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
                {/* <p
                    className={
                        !errors.usernameLengthError && props.username.length > 1
                            ? "validationPass"
                            : "errorMessage"
                    }
                >
                    {errors.usernameLengthError &&
                        window.innerWidth > 600 &&
                        "Username must be at least 6 characters"}
                </p> */}
            </div>

            {/* Email field */}
            <div className="row">
                <label htmlFor="regEmail">Email:</label>
                <input
                    id="regEmail"
                    name="regEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <p
                    className={
                        !errors.emailError && props.email.length > 1
                            ? "validationPass"
                            : "errorMessage"
                    }
                >
                    {errors.emailError &&
                        window.innerWidth > 1200 &&
                        "Invalid email. Please try again"}
                </p>
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
                <p
                    className={
                        !errors.passwordLengthError && props.password.length > 1
                            ? "validationPass"
                            : "errorMessage"
                    }
                >
                    {errors.passwordLengthError &&
                        window.innerWidth > 1200 &&
                        "Password must be at least 6 characters"}
                </p>
            </div>

            <br />

            {/* Repeat Password field */}
            <div className="row">
                <label htmlFor="regRepeatPassword">Repeat Password:</label>
                <input
                    id="regRepeatPassword"
                    name="regRepeatPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <p
                    className={
                        !errors.passwordMatchError &&
                        props.repeatPassword.length > 1
                            ? "validationPass"
                            : "errorMessage"
                    }
                >
                    {errors.passwordMatchError &&
                        window.innerWidth > 1200 &&
                        "Passwords do not match"}
                </p>
            </div>
            <br />
            <input type="submit" value="Register" />
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
