import React from "react";

export default function ForgotPassword(props) {
    return (
        <div>
            <p>Reset Password</p>
            <input type="email" />
            <p onClick={() => props.toggleForgotPassword(false)}>
                Back to login
            </p>
        </div>
    );
}
