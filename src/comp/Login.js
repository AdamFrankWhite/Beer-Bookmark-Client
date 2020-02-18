import React from 'react'
import ReactLoading from 'react-loading'

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
                {!props.loading ? 
                    <button onClick={props.login}>Login</button> :
                    <ReactLoading type={"spin"} color={"#000"} height={25} width={25} className="spinner" />
                }
                {props.showError && <p className="loginError">{props.errorMessage}</p>}
            </div>
        )
    }   else {
        return null
    }
}

export default Login