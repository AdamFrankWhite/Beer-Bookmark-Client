import React, { useState } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import { login } from "../redux/actions/userActions";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //     // Set loading animation
    //     this.setState({ loading: true });
    //     if (!this.state.username) {
    //         this.setState({
    //             showError: true,
    //             errorMessage: "Please enter username",
    //             loading: false,
    //         });
    //     } else {
    //         axios
    //             .post(`${this.baseUrl}/users/login`, userCredentials)
    //             .then((res) => {
    //                 window.localStorage.setItem("access_token", res.data.token);
    //                 this.setState({
    //                     redirect: "profile",
    //                     favouriteBeers: res.data.beers || [],
    //                     loggedIn: true,
    //                     showError: false,
    //                     loading: true,
    //                     currentUser: res.data.user.username,
    //                 });
    //                 this.props.getUser(res.data.user.username);
    //                 // this.props.getBeers(res.data.user.username);
    //             })
    //             .catch(() =>
    //                 this.setState({
    //                     showError: true,
    //                     errorMessage: "Incorrect password. Please try again",
    //                     loading: false,
    //                 })
    //             );

    //     }
    // }
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
                {props.showError && (
                    <p className="loginError">{props.errorMessage}</p>
                )}
            </div>
        );
    } else {
        return null;
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    login,
};
export default connect(mapStateToProps, mapActionsToProps)(Login);
