import React, { useState } from "react";
import axios from "axios";
const NewPassword = ({ match, location }) => {
    const { search } = location;
    const queryRegEx = /\?q=/;
    //Remove query string
    const requestId = search.replace(queryRegEx, "");

    //New password
    const [newPassword, setNewPassword] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    return (
        <div className="reset-pass-cont">
            <h1>New Password</h1>
            <input
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
                onClick={() => {
                    axios
                        .put("http://localhost:5000/users/reset", {
                            id: requestId,
                            newPassword,
                        })
                        .then((res) => {
                            console.log(res);
                            if (res.status == 200) {
                                setSuccess(true);
                            } else {
                                setError("Error. Please try again.");
                            }
                        });
                    console.log(requestId, newPassword);
                }}
                className="button"
            >
                Submit
            </span>
            {success && <p className="reset-success">password changed</p>}
            {error && <p className="reset-error">{error}</p>}
        </div>
    );
};

export default NewPassword;
