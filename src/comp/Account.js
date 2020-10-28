import React from "react";
import { connect } from "react-redux";
import { setColorScheme } from "../redux/actions/userActions";
function Account(props) {
    return (
        <div>
            <h1>Account</h1>
            <h2>Set Color Scheme</h2>
            <h3 onClick={() => props.setColorScheme("light")}>Light</h3>
            <h3 onClick={() => props.setColorScheme("dark")}>Dark</h3>
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
