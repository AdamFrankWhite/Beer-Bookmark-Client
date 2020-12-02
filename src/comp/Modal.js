import React, { useState } from "react";
import { connect } from "react-redux";
import { addBeer, toggleModal } from "../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";
function Modal(props) {
    const [folder, setFolder] = useState("my-beers");
    const [folders, getFolders] = useState(props.user.beerGroups || []);
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Select folder</h2>
                <div
                    className={
                        folder == "my-beers" ? "highlight-folder" : "folder"
                    }
                    onClick={() => setFolder("my-beers")}
                >
                    <FontAwesomeIcon icon={faFolder} />
                    My Beers
                </div>
                <div
                    className={
                        folder == "summer"
                            ? "highlight-folder pl-1"
                            : "folder pl-1"
                    }
                    onClick={() => setFolder("summer")}
                >
                    <FontAwesomeIcon icon={faFolder} />
                    Summer
                </div>
                <div
                    className={
                        folder == "winter"
                            ? "highlight-folder pl-1"
                            : "folder pl-1"
                    }
                    onClick={() => setFolder("winter")}
                >
                    <FontAwesomeIcon icon={faFolder} />
                    Winter
                </div>
                <div
                    className={
                        folder == "spain 2019"
                            ? "highlight-folder pl-1"
                            : "folder pl-1"
                    }
                    onClick={() => setFolder("spain 2019")}
                >
                    <FontAwesomeIcon icon={faFolder} />
                    Spain 2019
                </div>

                <p
                    onClick={() => {
                        props.addBeer({
                            username: props.user.userData.username,
                            // brewery: props.brewery,
                            beerData: props.user.addBeerData,
                        });
                        props.toggleModal(false);
                    }}
                    className="add-fave-btn"
                >
                    Add to bookmarks
                </p>
                <p
                    onClick={() => {
                        props.toggleModal(false);
                    }}
                    className="cancel-modal-btn"
                >
                    Cancel
                </p>
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
    addBeer,
    toggleModal,
};
export default connect(mapStateToProps, mapActionsToProps)(Modal);
