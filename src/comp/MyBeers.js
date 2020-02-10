import React from 'react'
import Beer from './Beer'
import ReactLoading from 'react-loading'
import FlipMove from 'react-flip-move';

class MyBeers extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: true
        }
    }

   
    componentDidMount() {
        this.setState({isLoading: false})
    }
   

    render() {
        const center = {margin: "auto"}
        const beers = this.props.favouriteBeers.map(beer => 
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
                        <span className="sort-btn" onClick={() => this.props.sortBeers("beerName")}>Name</span>
                        <span className="sort-btn" onClick={() => this.props.sortBeers("stars")}>Top Rated</span>
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
