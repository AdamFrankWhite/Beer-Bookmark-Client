import React, { useState } from "react";
import axios from "axios";
const NewPassword = ({ match, location }) => {
    const { search } = location;
    const queryRegEx = /\?q=/;
    //Remove query string
    const requestId = search.replace(queryRegEx, "");

    //New password
    const [newPassword, setNewPassword] = useState("");
    return (
        <div>
            <h1>New Password</h1>
            <input
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
                onClick={() => {
                    axios
                        .put("http://localhost:5000/users/reset", {
                            id: requestId,
                            newPassword,
                        })
                        .then((res) => {
                            console.log(res.data);
                        });
                    console.log(requestId, newPassword);
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default NewPassword;
