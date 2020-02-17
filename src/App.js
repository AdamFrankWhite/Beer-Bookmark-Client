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
            loading: false,
            loggedIn: false,
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
            searchTerm: "",
            searchType: "beer",
            showError: false,
            errorMessage: "",
            regErrors: {
                usernameLengthError: false, 
                emailError: false, 
                passwordLengthError: false, 
                passwordMatchError: false
            },
            beerData: [],
            breweryData: [],
            searchBeerData: [],
            favouriteBeers: [],
            redirect: "",
            deployment: "production"
        }
        this.baseUrl = this.state.deployment === "production" ? "https://fierce-plateau-38188.herokuapp.com" : "http://localhost:5000"
        this.addBeer = this.addBeer.bind(this)
        this.deleteBeer = this.deleteBeer.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.register = this.register.bind(this)
        this.validation = this.validation.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.searchBeer = this.searchBeer.bind(this)        
        this.sortBeers = this.sortBeers.bind(this)
        this.changeTab = this.changeTab.bind(this)
        this.updateBeer = this.updateBeer.bind(this)
    }


    addBeer(beerData, brewery) {
        const postData = {
            id: beerData.bid,
            username: this.state.username,
            beerName: beerData.beer_name,
            abv: beerData.beer_abv.toString(),
            beerDescription: beerData.beer_style,
            brewery: brewery,
            stars: "1",
            date: new Date(),
            img: beerData.beer_label
        }
        
        axios.post(`${this.baseUrl}/users/my-beers/add`, postData).then(res => {
            this.setState({favouriteBeers: res.data})
            console.log(res.data)
    })  
    }

    deleteBeer(beer) {
        let deleteData = {
            beerData: beer,
            username: this.state.username
        }
        axios.post(`${this.baseUrl}/users/my-beers/delete-beer`, deleteData).then(res => {
            this.setState({favouriteBeers: res.data})
    }) 
        

        

        //need to update state before and after delete to ensure real-time update
    }

    updateBeer(beer, rating) {
        let updateData = {
            beerData: beer,
            username: this.state.username,
            newRating: rating
        }
        console.log(updateData)
        axios.post(`${this.baseUrl}/users/my-beers/update`, updateData).then(res => {
            this.setState({favouriteBeers: res.data})
        })          
    }
    login() {
        const userCredentials = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({loading: true})
        if (this.state.username && this.state.password) {
            axios.post(`${this.baseUrl}/users/login`, userCredentials).then(res => {
                this.setState({redirect: "profile", loggedIn: true, showError: false})
            }).catch(() => this.setState({showError: true, errorMessage: "Incorrect password. Please try again"}))
        
            axios.get(`${this.baseUrl}/users/my-beers/`, {params: {username: this.state.username}}).then(res => {
           
            this.setState({favouriteBeers: res.data.beers})
        })
                    
                
        
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
            axios.post(`${this.baseUrl}/users/register`, newUser).then(res =>
            {
                console.log(res)
                //TODO - Validate email
                this.setState({redirect: "login", regErrors: {}})
            })
            
            console.log("User added", newUser)
        }
    }

    validation(type) {
        let validation = this.state.regErrors

        //Form validation
        if (type === "username") {
            this.state.username.length < 6 ? validation.usernameLengthError = true : validation.usernameLengthError = false
        }

        if (type === "email") {
            this.state.email.length < 6 || !this.state.email.includes("@") ? validation.emailError = true : validation.emailError = false
        }

        if (type === "password") {
            this.state.password.length < 6 ? validation.passwordLengthError = true : validation.passwordLengthError = false
        }

        if (type === "repeatPassword") {
            this.state.password !== this.state.repeatPassword ? validation.passwordMatchError = true : validation.passwordMatchError = false
        }

        this.setState({regErrors: validation})    
    }
    

    renderRedirect() {
        if (this.state.redirect === "login") {
            return <Redirect to="/login" />
        } else if (this.state.redirect === "profile") {
            this.setState({loading: false})
            return <Redirect to="/my-beers" />
        }
    }

    handleChange(e) {
        // Update form fields and validation
        let changeType = e.target.name
        this.setState({[changeType]: e.target.value},() => {
            this.validation(changeType);
        })
    }

    searchBeer(searchTerm, searchType) {
        //clear search data
        this.setState({beerData: [], breweryData: []})
        axios.get(`https://api.untappd.com/v4/search/${searchType}?q=${searchTerm}`, {params: {client_id:"F94775549BAC795E436858A50A3616690D3CD446", client_secret:"844CF3E397DB0294FC89ACE34560918CAFD035FB"}}).then(response => {
            searchType === "beer" && this.setState({beerData: response.data.response.beers.items, isLoading: false})
            searchType === "brewery" && this.setState({breweryData: response.data.response.brewery.items})
            console.log(this.state.beerData)
         
        })
    }

    sortBeers(searchType) {
        let sortedBeers;
        if (searchType=="beerName"){
            sortedBeers = this.state.favouriteBeers.sort((a, b) => (a[searchType] > b[searchType]) ? 1 : ((b[searchType] > a[searchType]) ? -1 : 0))
        } else if (searchType="stars") {
            sortedBeers = this.state.favouriteBeers.sort((a, b) => (a[searchType] < b[searchType]) ? 1 : ((b[searchType] < a[searchType]) ? -1 : 0))
        }
        
        this.setState({favouriteBeers: sortedBeers})
        console.log(sortedBeers)
    }

    changeTab(selectedTab) {
        this.setState({searchType: selectedTab})
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
                            regErrors={this.state.regErrors}
                            validation={this.validation}
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
                            loading={this.state.loading}
                            loggedIn={this.state.loggedIn}
                            showError={this.state.showError}
                            errorMessage={this.state.errorMessage}  
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
                            sortBeers={this.sortBeers}
                        />
                    )} 
                />}
                <Route 
                    path="/search" 
                    render={ routeProps => ( 
                        <Search {...routeProps} 
                            beerData={this.state.beerData}
                            breweryData={this.state.breweryData} 
                            favouriteBeers={this.state.favouriteBeers} 
                            addBeer={this.addBeer} 
                            searchTerm={this.state.searchTerm}
                            searchType={this.state.searchType} 
                            handleChange={this.handleChange}
                            searchBeer={this.searchBeer}
                            loggedIn={this.state.loggedIn}
                            changeTab={this.changeTab}
                        /> 
                    )} 
                />
                <Route 
                    path="/random-beer" 
                    render={ routeProps => ( 
                        <RandomBeer {...routeProps} 
                            handleChange={this.handleChange}
                            addBeer={this.addBeer}
                            loggedIn={this.state.loggedIn}
                            favouriteBeers={this.state.favouriteBeers}
                        /> 
                    )} 
                />
            </Router>
            
        );
    }
  
}

export default App;
