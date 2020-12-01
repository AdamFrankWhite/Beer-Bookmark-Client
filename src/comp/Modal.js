import React from "react";
import { connect } from "react-redux";
import { addBeer, toggleModal } from "../redux/actions/userActions";
function Modal(props) {
    return (
        <div className="add-modal">
            <p
                onClick={() => {
                    props.addBeer({
                        username: props.user.userData.username,
                        // brewery: props.brewery,
                        beerData: props.user.addBeerData,
                    });
                    props.toggleModal(false);
                }}
            >
                Add to favourites
            </p>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    addBeer,
    toggleModal,
};
export default connect(mapStateToProps, mapActionsToProps)(Modal);
