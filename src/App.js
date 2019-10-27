import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import Header from './comp/Header'
import Login from './comp/Login'
import Register from './comp/Register'
import Search from './comp/Search'
import Dashboard from './comp/Dashboard'
import RandomBeer from './comp/RandomBeer'
import MyBeers from './comp/MyBeers'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import axios from 'axios'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
            searchTerm: "",
            errorMessage: "",
            beerData: [],
            searchBeerData: [],
            favouriteBeers: [],
            redirect: ""
        }
        this.addBeer = this.addBeer.bind(this)
        this.deleteBeer = this.deleteBeer.bind(this)
        this.updateBeer = this.updateBeer.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.register = this.register.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateBeers = this.updateBeers.bind(this)
    }


    addBeer(beerData) {
        const postData = {
            id: beerData.id,
            username: this.state.username,
            beerName: beerData.name,
            beerType: beerData.abv.toString(),
            beerDescription: beerData.tagline,
            brewery: "Punk IPA",
            stars: "1",
            date: new Date(),
            img: beerData.image_url
        }
        
        axios.get('http://localhost:5000/users/my-beers/', {params: {username: this.state.username}}).then(res => {
            console.log(res.data)
            this.setState({favouriteBeers: res.data.beers})})
            axios.post("http://localhost:5000/users/my-beers/add", postData).then(res => {        
                axios.get('http://localhost:5000/users/my-beers/', {params: {username: this.state.username}}).then(res => {
            console.log(res.data)
            this.setState({favouriteBeers: res.data.beers})})
        })
        console.log(postData)
        
        
                    
                
    }

    deleteBeer(beer) {
        let deleteData = {
            beerData: beer,
            username: this.state.username
        }
        axios.get('http://localhost:5000/users/my-beers/', {params: {username: this.state.username}}).then(res => {
            this.setState({
                favouriteBeers: res.data.beers
            })
            axios.post('http://localhost:5000/users/my-beers/delete-beer', deleteData).then(res => {
            // console.log("hello")
            console.log("Beer deleted", res.status)
            axios.get('http://localhost:5000/users/my-beers/', {params: {username: this.state.username}}).then(res => {
            this.setState({
                favouriteBeers: res.data.beers
            })
        })
        })
        })
        
        

        

        //need to update state before and after delete to ensure real-time update
    }

    updateBeer(beer, rating) {
        let updateData = {
            beerData: beer,
            username: this.state.username,
            newRating: rating
        }
        axios.get('http://localhost:5000/users/my-beers/', {params: {username: this.state.username}}).then(res => {
            this.setState({
                favouriteBeers: res.data.beers
            })
            axios.post('http://localhost:5000/users/my-beers/update', updateData).then(res => {
            console.log(res)
            axios.get('http://localhost:5000/users/my-beers/', {params: {username: this.state.username}}).then(res => {
            this.setState({
                favouriteBeers: res.data.beers
            })
        })
        })
        })
        
        
    }
    // componentDidMount() {
    //     axios.get("http://localhost:5000/users/my-beers/", {params: {username: this.state.username}}).then(res => {
    //         this.setState({favouriteBeers: res.data.beers})
    //         // console.log(res.data)
    //     })
    // }
    login() {
        const userCredentials = {
            username: this.state.username,
            password: this.state.password
        }

        if (this.state.username && this.state.password) {
            axios.post('http://localhost:5000/users/login', userCredentials).then(res => {
                console.log("BOO")
        })
        axios.get('http://localhost:5000/users/my-beers/', {params: {username: this.state.username}}).then(res => {
            console.log(res.data)
            this.setState({favouriteBeers: res.data.beers})})
                    
                
        this.setState({redirect: "profile", loggedIn: true}) // change to if successful
        }
        
    }

    logout() {
        this.setState({loggedIn: false, redirect: "login"}) // how to redirect on logout??
    }
    register() {
        let errorMessage = {}
        let newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        if (this.state.password === this.state.repeatPassword && this.state.username.length > 5 && this.state.password.length > 5) {
            axios.post('http://localhost:5000/users/register', newUser).then(res =>
            {
                console.log(res)
                //TODO - Validate email
                this.setState({redirect: "login", errorMessage: errorMessage})
            })
            
            
            console.log("User added", newUser)
        }
        if (this.state.username.length <= 6) {
            errorMessage.usernameError = "Username must be at last 6 characters" 
        }
        if (this.state.password !== this.state.repeatPassword) {
            errorMessage.passwordMatchError = "Passwords must match"
        }
        if (this.state.password.length < 6) {
            errorMessage.passwordLengthError = "Password must be at least 6 characters"
        }

        
    }

    renderRedirect() {
        if (this.state.redirect === "login") {
            return <Redirect to="/login" />
        } else if (this.state.redirect === "profile") {
            return <Redirect to="/my-beers" />
        }
    }

    updateBeers() {
        // TO DO
            // this.setState({
            //     searchBeerData: ??
            // })
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
        this.updateBeers() // with search term rgument
    }
    render() {
        return (
            <Router>
                <Header loggedIn={this.state.loggedIn} logout={this.logout} />
                <br />
                {/* <Login  login={this.clickLogin} handleChange={this.handleChange} username={this.state.username} password={this.state.password} /> */}
                {this.renderRedirect()}
                <Route 
                    path="/register" 
                    render={ routeProps => ( 
                        <Register {...routeProps} 
                            email={this.state.email} 
                            register={this.register} 
                            handleChange={this.handleChange} 
                            username={this.state.username} 
                            password={this.state.password} 
                            repeatPassword={this.state.repeatPassword} 
                            errorMessage={this.state.errorMessage} 
                        />
                    )}        
                />
                <Route 
                    path="/login" 
                    render={ routeProps => ( 
                        <Login {...routeProps} 
                            login={this.login} 
                            handleChange={this.handleChange} 
                            username={this.state.username} 
                            password={this.state.password} 
                            loggedIn={this.state.loggedIn}   
                        />
                    )}        
                />
                {this.state.loggedIn && 
                <Route 
                    path="/my-beers" 
                    render={ routeProps => ( 
                        <MyBeers {...routeProps} 
                            addBeer={this.addBeer} 
                            deleteBeer={this.deleteBeer} 
                            updateBeer={this.updateBeer} 
                            favouriteBeers={this.state.favouriteBeers} 
                            searchTerm={this.state.searchTerm} 
                            handleChange={this.handleChange}
                            username={this.state.username}
                        />
                    )} 
                />}
                <Route 
                    path="/search" 
                    render={ routeProps => ( 
                        <Search {...routeProps} 
                            beerData={this.state.beerData} 
                            favouriteBeers={this.state.favouriteBeers} 
                            addBeer={this.addBeer} 
                            searchTerm={this.state.searchTerm} 
                            handleChange={this.handleChange}
                        /> 
                    )} 
                />
                <Route 
                    path="/random-beer" 
                    render={ routeProps => ( 
                        <RandomBeer {...routeProps} 
                            searchTerm={this.state.searchTerm} 
                            handleChange={this.handleChange}
                        /> 
                    )} 
                />
                {this.state.loggedIn ? <Dashboard /> : null}
            </Router>
            
        );
    }
  
}

export default App;
