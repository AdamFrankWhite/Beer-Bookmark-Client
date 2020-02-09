import React from 'react'
import Beer from './Beer'
import Brewery from './Brewery'
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
    }

    
    componentDidMount() {
        
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
        const breweries = this.props.breweryData.map(item => 
            <Brewery 
                img={item.brewery.brewery_label}
                name={item.brewery.brewery_name}
                location={item.brewery.location.brewery_city}
                beerNum={item.brewery.beer_count}
            />
            )
            console.log(this.state.beerData)
        return (
            <div className="App">
                {this.state.isLoading && <ReactLoading style={center} type="bubbles" color="black" />}
                {!this.state.isLoading &&
                <div> 
                    <p>Can't quite remember that awesome beer you had last night? Save it to BeerMe</p>
                    <label htmlFor="searchTerm">Search: 
                    <input type="text" value={this.props.searchTerm} onChange={this.props.handleChange} name="searchTerm"></input>
                    </label>
                    <button onClick={() => this.props.searchBeer(this.props.searchTerm, this.props.searchType)} >Go</button>
                    <br></br>
                    <label htmlFor="searchType">Beer: 
                        <input name="searchType" type="radio" value="beer" onChange={this.props.handleChange}></input>
                    </label>
                    <label htmlFor="searchType">Brewery: 
                        <input name="searchType" type="radio" value="brewery" onChange={this.props.handleChange}></input>
                    </label>
                    
                    <div className="beer-container">
                        {beers}
                        {breweries}
                    </div>
                </div>}
                
            </div>
        )
    }
    
}

export default Search
