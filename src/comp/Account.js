import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setColorScheme, resetPassword } from "../redux/actions/userActions";
import axios from "axios";
function Account(props) {
    const [checked, setChecked] = useState(
        props.user.colorScheme !== "dark" ? false : true
    );

    useEffect(() => {
        !checked
            ? props.setColorScheme(props.user.userData.username, "light")
            : props.setColorScheme(props.user.userData.username, "dark");
    }, [checked]);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const updatePassword = (username, password, id) => {
        axios
            .put(`http://localhost:5000/users/reset?=${id}`, {
                username,
                password,
            })
            .then((res) => {});
    };
    return (
        <div className="account-cont">
            <h1>Account</h1>
            <h2>Set Color Scheme</h2>
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
            <h2>Email</h2>
            <span>{props.user.userData.email}</span>
            <span>edit</span>

            <div className="reset-pass-cont">
                <h2>Reset Password</h2>
                <label htmlFor="currentPassword">Current password</label>
                <input
                    id="currentPassword"
                    type="text"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <label htmlFor="newPassword">New password</label>
                <input
                    id="newPassword"
                    type="text"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="confirmNewPassword">Confirm new password</label>
                <input
                    id="confirmNewPassword"
                    type="text"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <span
                    className="button"
                    onClick={() =>
                        props.resetPassword(props.user.userData.email)
                    }
                >
                    Send
                </span>
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
    resetPassword,
};
export default connect(mapStateToProps, mapActionsToProps)(Account);
