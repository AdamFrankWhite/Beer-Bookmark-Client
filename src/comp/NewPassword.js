import React from "react";

const NewPassword = ({ match, location }) => {
    const { search } = location;
    const queryRegEx = /\?q=/;
    //Remove query string
    const requestId = search.replace(queryRegEx, "");
    return (
        <div>
            <h1>New Password</h1>
            <input type="password" />
            <button onClick={() => console.log(requestId)}>Submit</button>
        </div>
    );
};

export default NewPassword;
