import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons/faSort";
import { sortBeers } from "../redux/actions/userActions";

const SortButton = ({ sortType, name, toggleHover, setOrder, checkHover }) => {
    return (
        <span
            className={`sort-btn ${sortType}-col`}
            onClick={() => {
                setOrder(sortType);
            }}
            onMouseEnter={() => toggleHover(sortType)}
            onMouseLeave={() => toggleHover(false)}
        >
            {name}
            <FontAwesomeIcon
                // style={{ color: checkHover(sortType) }}
                icon={faSort}
            />
        </span>
    );
};

export default SortButton;
