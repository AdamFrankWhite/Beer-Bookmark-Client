import React from 'react'
import axios from 'axios'

class RandomBeer extends React.Component {
    constructor() {
        super()
        this.state = {
            randomBeerData: []
        }
        this.randomBeer = this.randomBeer.bind(this)
    }

    componentDidMount() {
        const randomBeer = Math.floor(Math.random() * 15000)
        
        // search by ID
        axios.get(`https://api.untappd.com/v4/beer/info/${randomBeer}`, {params: {client_id:"F94775549BAC795E436858A50A3616690D3CD446", client_secret:"844CF3E397DB0294FC89ACE34560918CAFD035FB"}}).then(res => {
            console.log(res.data.response.beer)
            this.setState({randomBeerData: res.data.response.beer})
        })
    }

    randomBeer(beerType) {
        axios.get(`https://api.untappd.com/v4/search/beer/?q=${beerType}`, {params: {client_id:"F94775549BAC795E436858A50A3616690D3CD446", client_secret:"844CF3E397DB0294FC89ACE34560918CAFD035FB"}}).then(res => {
            
            const randomNum = Math.floor(Math.random() * res.data.response.beers.count)
            console.log(res.data.response.beers.items[randomNum])
            this.setState({randomBeerData: res.data.response.beers.items[randomNum].beer})
        })
    }
    render() {
        const beerTypes = ["pale", "white", "wheat", "stout", "porter", "session", "fruit"]
        return (
            <div className="randomBeer">
                {beerTypes.map(beerType => <button onClick={() => this.randomBeer(beerType)}>{beerType}</button>)}

                
                <button onClick={() => this.props.addBeer(this.state.randomBeerData)}>Add To Favourites</button>
                <h1>{this.state.randomBeerData.beer_name}</h1>
                <img src={this.state.randomBeerData.beer_label}></img>
                <h2>ABV: {this.state.randomBeerData.beer_abv}%</h2>
                <h3>{this.state.randomBeerData.beer_style}</h3>
                <h4>{this.state.randomBeerData.beer_description}</h4>
                {/* <h5><a href={this.state.randomBeerData.brewery.contact.url} target="_blank">{this.state.randomBeerData.brewery.brewery_name}</a></h5> */}
            </div>
        

        )
    }
    
}

export default RandomBeer
