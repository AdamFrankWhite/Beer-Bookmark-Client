import React from 'react'
import Beer from './Beer'
import ReactLoading from 'react-loading'

class MyBeers extends React.Component {
    constructor() {
        super()
        this.state = {
            beerData: [],
            favouriteBeers: [],
            isLoading: true
        }
        this.sortBeers = this.sortBeers.bind(this)
    }

   
    componentDidMount() {
        this.setState({isLoading: false, beerData: this.props.favouriteBeers})
    }
   
    sortBeers(searchType) {
        let sortedBeers = this.state.beerData.sort((a, b) => (a[searchType] > b[searchType]) ? 1 : ((b[searchType] > a[searchType]) ? -1 : 0))
        this.setState({beerData: sortedBeers})
        console.log(sortedBeers)
    }

    render() {
        const center = {margin: "auto"}
        const beers = this.state.beerData.map(beer => 
            <Beer 
                myBeers={true} 
                favouriteBeers={this.props.favouriteBeers} 
                beerData={beer} 
                src={beer.img} 
                id={beer._id} 
                name={beer.name} 
                abv={beer.abv} 
                description={beer.description} 
                addBeer={this.props.addBeer} 
                deleteBeer={this.props.deleteBeer} 
                updateBeer={this.props.updateBeer}
            />)
        return (
            <div className="App">
                <h1 className="heading">My Favourite Beers</h1>
                <span>Sort by </span>
                <span className="sort-btn" onClick={() => this.sortBeers("beerName")}>Name</span>
                <span className="sort-btn" onClick={() => this.sortBeers("stars")}>Top Rated</span>
                {this.state.isLoading && <ReactLoading style={center} type="bubbles" color="black" height={400} width={350} />}
                <div className="beer-container">  
                    {beers}
                </div>
                <h1 className="heading">My Favourite Breweries</h1>
                
            </div>
        )
    }
    
}

export default MyBeers
