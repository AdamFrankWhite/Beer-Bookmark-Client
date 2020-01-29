import React from 'react'

function Register(props) {
    let errors = props.regErrors
    return (
        <div className="registration">
            <h2>Register</h2>
            <label for="username">Username: 
                <input 
                    name="username" 
                    type="text" 
                    value={props.username} onChange={(e) => {props.handleChange(e); props.validation()}}>
                </input>
                <p className="errorMessage">{props.regErrors.usernameLengthError && "Username must be at least 6 characters"}</p>
            </label>
            
            
            
            <label for="email">Email: 
                <input 
                    name="email" 
                    type="email" 
                    value={props.email} 
                    onChange={(e) => {props.handleChange(e); props.validation()}}>
                </input>
                <p className="errorMessage" >{props.regErrors.emailError && "Invalid email. Please try again"}</p>
            </label>
            
            <br/>


            <label for="password">Password: 
                <input 
                    name="password" 
                    type="password" 
                    value={props.password} 
                    onChange={(e) => {props.handleChange(e); props.validation()}}>
                </input>
                <p className="errorMessage">{props.regErrors.passwordLengthError && "Password must be at least 6 characters"}</p>
            </label>
            
            <br />


            <label for="repeatPassword">Repeat Password: 
                <input 
                    name="repeatPassword" 
                    type="password" 
                    value={props.repeatPassword} 
                    onChange={(e) => {props.handleChange(e); props.validation()}}>
                </input>
                <p className="errorMessage">{props.regErrors.passwordMatchError && "Passwords do not match"}</p>
            </label>
            <br />
            <button onClick={props.register}>Register</button>
        </div>
    )
}

export default Register