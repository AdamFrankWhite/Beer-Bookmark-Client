import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    setColorScheme,
    changePassword,
    changeEmail,
} from "../redux/actions/userActions";
import "react-slidedown/lib/slidedown.css";

function Theme(props) {
    const [checked, setChecked] = useState(
        props.user.colorScheme !== "dark" ? false : true
    );
    useEffect(() => {
        console.log(checked);
        !checked
            ? props.setColorScheme(props.user.userData.username, "light")
            : props.setColorScheme(props.user.userData.username, "dark");
    }, [checked]);

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
