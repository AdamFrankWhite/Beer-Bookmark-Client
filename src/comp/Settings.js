import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setMarketingPref } from "../redux/actions/userActions";
function Settings(props) {
    const [marketingPref, toggleMarketingPref] = useState(
        props.user.marketingPref
    );
    useEffect(() => {
        toggleMarketingPref(props.user.marketingPref);
    }, [props.user.marketingPref]);
    return (
        <div className="account-cont">
            <h1>Settings</h1>
            <h2>Dashboard / Privacy</h2>
            <div className="settings-content">
                <div className="flex-row">
                    <input
                        type="checkbox"
                        defaultChecked={marketingPref}
                        onClick={() => toggleMarketingPref(!marketingPref)}
                    />
                    <p>
                        I would like to receive emails about beer offers and
                        deals
                    </p>
                </div>

                <span
                    className="button"
                    onClick={() =>
                        props.setMarketingPref(
                            marketingPref,
                            props.user.userData.username
                        )
                    }
                >
                    Update
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
    setMarketingPref,
};

export default connect(mapStateToProps, mapActionsToProps)(Settings);
