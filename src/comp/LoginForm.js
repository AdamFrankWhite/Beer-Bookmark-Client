import React, { useState } from "react";
import ReactLoading from "react-loading";
import { Redirect, Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../redux/actions/userActions";
import ForgotPassword from "./ForgotPassword";
function LoginForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            <div className="login-head">
                <img src="images/login.png" alt="login" />
                <h2>Login</h2>
            </div>

            <div className="row">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
            </div>
            <br />
            <div className="row">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <br />
            {!props.user.loading ? (
                <input
                    type="submit"
                    className="button"
                    value="Login"
                    onClick={() => {
                        props.login({ username, password });
                    }}
                ></input>
            ) : (
                <ReactLoading
                    type={"spin"}
                    color={"#000"}
                    height={25}
                    width={25}
                    className="spinner"
                />
            )}
            <Link to="forgot">Forgot Password?</Link>

            {props.user.loggedIn && props.user.beers.length > 0 && (
                <Redirect to="my-beers" />
            )}
            {props.user.loggedIn && props.user.beers.length == 0 && (
                <Redirect to="search" />
            )}
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    login,
};
export default connect(mapStateToProps, mapActionsToProps)(LoginForm);
