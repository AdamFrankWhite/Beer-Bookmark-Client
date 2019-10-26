import React from 'react'
import Beer from './Beer'
import axios from 'axios'
class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            beerData: [],
            favouriteBeers: []
        }
        // this.addBeer = this.addBeer.bind(this)
    }

    
    componentDidMount() {
        fetch("https://api.punkapi.com/v2/beers?per_page=80").then(response => response.json()).then(data => {
            this.setState({beerData: data})
            console.log(data)})
       
    }
    render() {
        const beers = this.state.beerData.map(beer => <Beer search={true} src={beer.image_url} id={beer._id} name={beer.name} abv={beer.abv} description={beer.tagline} beerData={beer} favouriteBeers={this.props.favouriteBeers} addBeer={this.props.addBeer}/>)
        return (
            <div className="App">
                <label htmlFor="searchTerm">Search: 
                    <input type="text" value={this.props.searchTerm} onChange={this.props.handleChange} name="searchTerm"></input>
                </label>
                <div className="beer-container">
                    {beers}
                </div>
                
            </div>
        )
    }
    
}

export default Search
