import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setColorScheme } from "../redux/actions/userActions";
function Account(props) {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        !checked ? props.setColorScheme("light") : props.setColorScheme("dark");
    }, [checked]);
    return (
        <div>
            <h1>Account</h1>
            <h2>Set Color Scheme</h2>
            <div className="slider-div">
                <p>Light</p>
                <label class="switch">
                    <input
                        type="checkbox"
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                    <span class="slider round"></span>
                </label>
                <p>Dark</p>
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
};
export default connect(mapStateToProps, mapActionsToProps)(Account);
