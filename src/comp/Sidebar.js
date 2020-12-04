import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { faPalette } from "@fortawesome/free-solid-svg-icons/faPalette";
export default function Sidebar() {
    return (
        <div className="settings-sidebar">
            <div className="mt-2">
                <FontAwesomeIcon className="dash-icon" icon={faUserCircle} />
                <h2>Dashboard</h2>
            </div>
            <nav>
                <Link to="/account/theme">
                    <FontAwesomeIcon icon={faPalette} />
                    Theme
                </Link>

                <Link to="/account/profile">
                    <FontAwesomeIcon icon={faUserCircle} />
                    Profile
                </Link>
                <Link to="/account/settings">
                    <FontAwesomeIcon icon={faCog} />
                    Privacy
                </Link>
            </nav>
        </div>
    );
}
