import React from 'react'
import axios from 'axios'

class RandomBeer extends React.Component {
    constructor() {
        super()
        this.state = {
            randomBeerData: [],
            randomBeerBrewery: {name: "", url: ""} // needed to avoid nested rendering bug
        }
        this.randomBeer = this.randomBeer.bind(this)
    }

    componentDidMount() {
        const randomBeer = Math.floor(Math.random() * 15000)
        
        // search by ID
        axios.get(`https://api.untappd.com/v4/beer/info/${randomBeer}`, {params: {client_id:"F94775549BAC795E436858A50A3616690D3CD446", client_secret:"844CF3E397DB0294FC89ACE34560918CAFD035FB"}}).then(res => {
            let breweryData = {
                name: res.data.response.beer.brewery.brewery_name,
                url: res.data.response.beer.brewery.contact.url
            }
            this.setState({
                randomBeerData: res.data.response.beer,
                randomBeerBrewery: breweryData
            })
        })
    }

    randomBeer(beerType) {
        axios.get(`https://api.untappd.com/v4/search/beer/?q=${beerType}`, {params: {client_id:"F94775549BAC795E436858A50A3616690D3CD446", client_secret:"844CF3E397DB0294FC89ACE34560918CAFD035FB"}}).then(res => {
            const randomNum = Math.floor(Math.random() * res.data.response.beers.count)    
            const breweryData = {
                    name: res.data.response.beers.items[randomNum].brewery.brewery_name,
                    url: res.data.response.beers.items[randomNum].brewery.contact.url
                }
            
            console.log(res.data.response.beers.items[randomNum].beer)
            this.setState({randomBeerData: res.data.response.beers.items[randomNum].beer, randomBeerBrewery: breweryData})
        })
    }
    render() {
        const beerTypes = ["pale", "white", "wheat", "stout", "porter", "session", "fruit"]
        console.log(this.state.randomBeerData)
        return (
            <div className="randomBeer">
                {beerTypes.map(beerType => <button onClick={() => this.randomBeer(beerType)}>{beerType}</button>)}

                <br></br>
        {this.props.loggedIn && <button className="buttons" onClick={() => this.props.addBeer(this.state.randomBeerData)}>Add To Favourites</button> }
                <h4>{this.state.randomBeerData.beer_name}</h4>
                <a href={this.state.randomBeerBrewery.url} target="_blank"><h5>{this.state.randomBeerBrewery.name}</h5></a>
                <img src={this.state.randomBeerData.beer_label}></img>
                <h5>ABV: {this.state.randomBeerData.beer_abv}%</h5>
                <h6>{this.state.randomBeerData.beer_style}</h6>
                <p className="description">{this.state.randomBeerData.beer_description}</p>
                
            </div>
        

        )
    }
    
}

export default RandomBeer
