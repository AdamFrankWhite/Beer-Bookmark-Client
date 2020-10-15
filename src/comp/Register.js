import React from "react";

function Register(props) {
    let errors = props.regErrors;
    return (
        <div className="registration">
            <h2>Register</h2>
            {/* Username field */}
            <div className="row">
                <label htmlFor="regUsername">Username: </label>
                <input
                    id="regUsername"
                    name="regUsername"
                    type="text"
                    value={props.username}
                    onChange={props.handleChange}
                ></input>
                {/* Conditional style based on error boolean and success */}
                <p
                    className={
                        !errors.usernameLengthError && props.username.length > 1
                            ? "validationPass"
                            : "errorMessage"
                    }
                >
                    {errors.usernameLengthError &&
                        window.innerWidth > 600 &&
                        "Username must be at least 6 characters"}
                </p>
            </div>

            {/* Email field */}
            <div className="row">
                <label htmlFor="regEmail">Email:</label>
                <input
                    id="regEmail"
                    name="regEmail"
                    type="email"
                    value={props.email}
                    onChange={props.handleChange}
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
                    value={props.password}
                    onChange={props.handleChange}
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
                    value={props.repeatPassword}
                    onChange={props.handleChange}
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
            <span className="button" onClick={props.register}>
                Register
            </span>
        </div>
    );
}

export default Register;
