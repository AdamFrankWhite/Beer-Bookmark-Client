import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
export default function Privacy() {
    return (
        <div className="privacy-cont">
            <span className="icon">
                <FontAwesomeIcon icon={faCog} />
            </span>
            <h1>Privacy Settings</h1>
        </div>
    );
}
