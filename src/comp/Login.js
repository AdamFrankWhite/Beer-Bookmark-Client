import React from "react";
import ReactLoading from "react-loading";

export default function Login(props) {
    if (!props.loggedIn) {
        return (
            <div className="registration">
                <div className="login-head">
                    <img src="/login.png" alt="login" />
                    <h2>Login</h2>
                </div>

                <label for="username">
                    Username:
                    <input
                        name="username"
                        type="text"
                        value={props.username}
                        onChange={props.handleChange}
                    ></input>
                </label>
                <br />
                <label for="password">
                    Password:
                    <input
                        name="password"
                        type="password"
                        value={props.password}
                        onChange={props.handleChange}
                    ></input>
                </label>
                <br />
                {!props.loading ? (
                    <span className="button" onClick={props.login}>
                        Login
                    </span>
                ) : (
                    <ReactLoading
                        type={"spin"}
                        color={"#000"}
                        height={25}
                        width={25}
                        className="spinner"
                    />
                )}
                {props.showError && (
                    <p className="loginError">{props.errorMessage}</p>
                )}
            </div>
        );
    } else {
        return null;
    }
}
