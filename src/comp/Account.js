import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import {
    setColorScheme,
    changePassword,
    changeEmail,
} from "../redux/actions/userActions";
import axios from "axios";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons/faTimesCircle";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";

function Account(props) {
    const [checked, setChecked] = useState(
        props.user.colorScheme !== "dark" ? false : true
    );
    const [showPasswordForm, togglePasswordForm] = useState(false);
    useEffect(() => {
        !checked
            ? props.setColorScheme(props.user.userData.username, "light")
            : props.setColorScheme(props.user.userData.username, "dark");
    }, [checked]);
    useEffect(() => {
        toggleEditEmail(false);
    }, [props.user]);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [editEmail, toggleEditEmail] = useState(false);
    const [newEmail, setNewEmail] = useState(props.user.userData.email);
    const center = { margin: "auto", height: 25, width: 25 };
    // const updatePassword = (username, password, id) => {
    //     axios
    //         .put(`http://localhost:5000/users/reset?=${id}`, {
    //             username,
    //             password,
    //         })
    //         .then((res) => {});
    // };
    return (
        <div className="account-cont">
            <span className="icon">
                <FontAwesomeIcon icon={faUserCircle} />
            </span>
            <h1>Account</h1>
            <div className="row">
                <h4>Set Color Scheme</h4>

                <div className="slider-div">
                    <p>Light</p>
                    <label class="switch">
                        <input
                            type="checkbox"
                            onChange={(e) => setChecked(e.target.checked)}
                            checked={checked}
                        />
                        <span class="slider round"></span>
                    </label>
                    <p>Dark</p>
                </div>
            </div>
            <div className="row">
                <h4>Email</h4>
                {props.user.loading && (
                    <ReactLoading style={center} type="spin" color="black" />
                )}
                {editEmail && !props.user.loading && (
                    <>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <span>
                            <FontAwesomeIcon
                                onClick={() =>
                                    props.changeEmail(
                                        props.user.userData.username,
                                        newEmail
                                    )
                                }
                                icon={faCheckCircle}
                                size="lg"
                            />
                        </span>
                    </>
                )}
                {!editEmail && <span>{props.user.userData.email}</span>}
                {!editEmail ? (
                    <span onClick={() => toggleEditEmail(!editEmail)}>
                        edit
                    </span>
                ) : (
                    <FontAwesomeIcon
                        onClick={() => toggleEditEmail(!editEmail)}
                        icon={faTimesCircle}
                        size="lg"
                    />
                )}
                {props.user.resetErrorMessage && (
                    <p>{props.user.resetErrorMessage}</p>
                )}
            </div>

            <div className="row">
                <h4>Change Password</h4>
                <span onClick={() => togglePasswordForm(!showPasswordForm)}>
                    Edit
                </span>
            </div>
            <SlideDown className={"my-dropdown-slidedown"}>
                {showPasswordForm && (
                    <div className="change-pass-cont">
                        <div className="row">
                            <label htmlFor="currentPassword">
                                Current password
                            </label>
                            <input
                                id="currentPassword"
                                type="password"
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="newPassword">New password</label>
                            <input
                                id="newPassword"
                                type="password"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="confirmNewPassword">
                                Confirm new password
                            </label>
                            <input
                                id="confirmNewPassword"
                                type="password"
                                onChange={(e) =>
                                    setConfirmNewPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="row">
                            <span
                                className="button"
                                onClick={() =>
                                    props.changePassword(
                                        props.user.userData.username,
                                        currentPassword,
                                        newPassword
                                    )
                                }
                            >
                                {props.user.loading && (
                                    <ReactLoading
                                        style={center}
                                        type="spin"
                                        color="black"
                                    />
                                )}
                                {props.user.resetErrorMessage
                                    ? props.user.resetErrorMessage
                                    : "Send"}
                                {/* TODO: separate reset route */}
                            </span>
                        </div>
                    </div>
                )}
            </SlideDown>
            <h1>Something else</h1>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    setColorScheme,
    changePassword,
    changeEmail,
};
export default connect(mapStateToProps, mapActionsToProps)(Account);
