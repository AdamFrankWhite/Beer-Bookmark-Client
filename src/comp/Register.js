import React from 'react'

function Register(props) {
    
        return (
            <div className="registration">
                <h2>Register</h2>
                <label for="username">Username: 
                    <input name="username" type="text" value={props.username} onChange={props.handleChange}></input>
                </label>
                <label for="email">Email: 
                    <input name="email" type="email" value={props.email} onChange={props.handleChange}></input>
                </label>
                <br/>
                <label for="password">Password: 
                    <input name="password" type="password" value={props.password} onChange={props.handleChange}></input>
                </label>
                <br />
                <label for="repeatPassword">Repeat Password: 
                    <input name="repeatPassword" type="password" value={props.repeatPassword} onChange={props.handleChange}></input>
                </label>
                {/* <p>Log username: {props.username}</p>
                <p>Log password: {props.password}</p>
                <p>Log Password2: {props.repeatPassword}</p> */}
                <br />
                <button onClick={props.register}>Register</button>
                <br />
                {props.errorMessage.usernameError}
                <br />
                {props.errorMessage.passwordMatchError}
                <br />
                {props.errorMessage.passwordLengthError}
            </div>
        )
}

export default Register