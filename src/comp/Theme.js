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

function Theme(props) {
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
            <h1>Theme</h1>
            <h2>Dashboard / Theme</h2>
            <div className="profile-cont">
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
            </div>
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
export default connect(mapStateToProps, mapActionsToProps)(Theme);
