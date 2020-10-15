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

                <div className="row">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={props.username}
                        onChange={props.handleChange}
                    ></input>
                </div>
                <br />
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={props.password}
                        onChange={props.handleChange}
                    ></input>
                </div>
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
