import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-dark bg-primary">
                    <a className="navbar-brand nav-title" href="#">BeerMe</a>
                    <div>
                    {this.props.loggedIn ?<Link to="/my-beers" className="link">My Beers</Link>: null}
                        <Link to="/search" className="link">Search</Link>
                        <Link to="/random-beer" className="link">Random Beer</Link>
                        <Link to="/register" className="link">Register</Link>
                        <Link to="/login" className="link">{this.props.loggedIn ? <span onClick={this.props.logout}>Logout</span> : <span>Login</span>}</Link>
                    </div>
                </nav>
            </header>
        )
    }
    
}

export default Header