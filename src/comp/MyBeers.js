import React from 'react'
import Beer from './Beer'
import ReactLoading from 'react-loading'
import FlipMove from 'react-flip-move';

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
        let sortedBeers;
        if (searchType=="beerName"){
            sortedBeers = this.state.beerData.sort((a, b) => (a[searchType] > b[searchType]) ? 1 : ((b[searchType] > a[searchType]) ? -1 : 0))
        } else if (searchType="stars") {
            sortedBeers = this.state.beerData.sort((a, b) => (a[searchType] < b[searchType]) ? 1 : ((b[searchType] < a[searchType]) ? -1 : 0))
        }
        
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
                <div className="my-beers-cont">
                    <h1 className="heading">My Favourite Beers</h1>
                    <div className="sort-btn-group">
                        <span>Sort by: </span>
                        <span className="sort-btn" onClick={() => this.sortBeers("beerName")}>Name</span>
                        <span className="sort-btn" onClick={() => this.sortBeers("stars")}>Top Rated</span>
                    </div>
                    
                    {this.state.isLoading && <ReactLoading style={center} type="bubbles" color="black" height={400} width={350} />}
                    <div className="beer-container">  
                        {/* <FlipMove> */}
                            {beers}
                        {/* </FlipMove> */}
                    </div>
                </div>
                
                {/* <div className="my-breweries-cont">
                    <h1 className="heading">My Favourite Breweries</h1>
                </div> */}
                
            </div>
        )
    }
    
}

export default MyBeers
