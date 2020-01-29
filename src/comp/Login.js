import React from 'react'

function Login(props) {
    if (!props.loggedIn) {
        return (
            <div className="registration">
                <h2>Login</h2>
                <label for="username">Username: 
                    <input name="username" type="text" value={props.username} onChange={props.handleChange}></input>
                </label>
                <br/>
                <label for="password">Password: 
                    <input name="password" type="password" value={props.password} onChange={props.handleChange}></input>
                </label>
                <br />
                <button onClick={props.login}>Login</button>
                {props.showError && <p>{props.errorMessage}</p>}
            </div>
        )
    }   else {
        return null
    }
}

export default Login