import React, { useState } from "react";
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../redux/actions/userActions";
function LoginForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
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
            <p
                onClick={() =>
                    props.toggleForgotPassword(!props.forgotPassword)
                }
            >
                Forgot Password?
            </p>
            {props.user.loggedIn && <Redirect to="/my-beers" />}
        </div>
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
