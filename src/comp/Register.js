import React from 'react'

function Register(props) {
    let errors = props.regErrors
    return (
        <div className="registration">
            <h2>Register</h2>
            {/* Username field */}
            <label htmlFor="username">Username: 
                <input 
                    name="username" 
                    type="text" 
                    value={props.username} onChange={props.handleChange}>
                </input>
                {/* Conditional style based on error boolean and success */}
                <p className={!errors.usernameLengthError && props.username.length > 1 ? "validationPass" : "errorMessage"}>{errors.usernameLengthError && window.innerWidth > 600 && "Username must be at least 6 characters"}</p>
            </label>
            
            {/* Email field */}
            <label htmlFor="email">Email: 
                <input 
                    name="email" 
                    type="email" 
                    value={props.email} 
                    onChange={props.handleChange}>
                </input>
                <p className={!errors.emailError && props.email.length > 1 ? "validationPass" : "errorMessage"}>{errors.emailError && window.innerWidth > 1200 && "Invalid email. Please try again"}</p>
            </label>
            
            {/* Password field */}
            <label htmlFor="password">Password: 
                <input 
                    name="password" 
                    type="password" 
                    value={props.password} 
                    onChange={props.handleChange}>
                </input>
                <p className={!errors.passwordLengthError && props.password.length > 1 ? "validationPass" : "errorMessage"}>{errors.passwordLengthError && window.innerWidth > 1200 && "Password must be at least 6 characters"}</p>
            </label>
            
            <br />

            {/* Repeat Password field */}
            <label htmlFor="repeatPassword">Repeat Password: 
                <input 
                    name="repeatPassword" 
                    type="password" 
                    value={props.repeatPassword} 
                    onChange={props.handleChange}>
                </input>
                <p className={!errors.passwordMatchError && props.repeatPassword.length > 1 ? "validationPass" : "errorMessage"}>{errors.passwordMatchError && window.innerWidth > 1200  && "Passwords do not match"}</p>
            </label>
            <br />
            <button onClick={props.register}>Register</button>
        </div>
    )
}

export default Register