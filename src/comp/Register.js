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
                    value={props.username} onChange={props.handleChange}>
                </input>
                {/* Conditional style based on error boolean and success */}
                <p className={!props.regErrors.usernameLengthError && props.username.length > 1 ? "validationPass" : "errorMessage"}>{props.regErrors.usernameLengthError && "Username must be at least 6 characters"}</p>
            </label>
            
            
            
            <label for="email">Email: 
                <input 
                    name="email" 
                    type="email" 
                    value={props.email} 
                    onChange={props.handleChange}>
                </input>
                <p className={!props.regErrors.emailError && props.email.length > 1 ? "validationPass" : "errorMessage"}>{props.regErrors.emailError && "Invalid email. Please try again"}</p>
            </label>
            
            <br/>


            <label for="password">Password: 
                <input 
                    name="password" 
                    type="password" 
                    value={props.password} 
                    onChange={props.handleChange}>
                </input>
                <p className={!props.regErrors.passwordLengthError && props.password.length > 1 ? "validationPass" : "errorMessage"}>{props.regErrors.passwordLengthError && "Password must be at least 6 characters"}</p>
            </label>
            
            <br />


            <label for="repeatPassword">Repeat Password: 
                <input 
                    name="repeatPassword" 
                    type="password" 
                    value={props.repeatPassword} 
                    onChange={props.handleChange}>
                </input>
                <p className={!props.regErrors.passwordMatchError && props.repeatPassword.length > 1 ? "validationPass" : "errorMessage"}>{props.regErrors.passwordMatchError && "Passwords do not match"}</p>
            </label>
            <br />
            <button onClick={props.register}>Register</button>
        </div>
    )
}

export default Register