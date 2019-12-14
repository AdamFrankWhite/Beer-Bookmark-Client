import React from 'react'
import Beer from './Beer'
import ReactLoading from 'react-loading'
import axios from 'axios'

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            beerData: [],
            favouriteBeers: [],
            isLoading: false
        }
        // this.addBeer = this.addBeer.bind(this)
    }

    
    componentDidMount() {
        // axios.get("https://api.untappd.com/v4/search/beer?q=Pilsner", {params: {client_id:"F94775549BAC795E436858A50A3616690D3CD446", client_secret:"844CF3E397DB0294FC89ACE34560918CAFD035FB"}}).then(response => {
        //     this.setState({beerData: response.data.response.beers.items, isLoading: false})
        //     console.log(response.data.response.beers.items)})
       
    }
    render() {
        const center = {margin: "auto", height: 150, width: 200}
        const beers = this.props.beerData.map(item => 
            <Beer 
                search={true} 
                src={item.beer.beer_label} 
                id={item.beer.bid} 
                name={item.beer.beer_name} 
                abv={item.beer.beer_abv} 
                style={item.beer.beer_style}
                description={item.beer.beer_description} 
                beerData={item.beer} 
                favouriteBeers={this.props.favouriteBeers} 
                addBeer={this.props.addBeer} 
                loggedIn={this.props.loggedIn} 
            />)
            console.log(this.state.beerData)
        return (
            <div className="App">
                {this.state.isLoading && <ReactLoading style={center} type="bubbles" color="black" />}
                {!this.state.isLoading &&
                <div> 
                    <p>Can't quite remember that awesome beer you had last night? Save it to MyFavouriteBeers</p>
                    <label htmlFor="searchTerm">Search: 
                    <input type="text" value={this.props.searchTerm} onChange={this.props.handleChange} name="searchTerm"></input>
                    </label>
                    <button onClick={() => this.props.searchBeer(this.props.searchTerm)}>Go</button>
                    <div className="beer-container">
                        {beers}
                    </div>
                </div>}
                
            </div>
        )
    }
    
}

export default Search
