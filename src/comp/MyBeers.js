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
    //     this.addBeer = this.addBeer.bind(this)
    }

    // addBeer(id) {
    //     console.log(`Beer ${id} added`)
    // }
    componentDidMount() {
        this.setState({isLoading: false})
    }
    componentDidUpdate() {
        console.log(this.props.favouriteBeers)
    }

    //TODO - need MyBeers state to update when App state updates - which it isn't currently.  Consider removing MyBeers state, take App state as props
    render() {
        const center = {margin: "auto"}
        const beers = this.props.favouriteBeers.map(beer => <Beer myBeers={true} favouriteBeers={this.props.favouriteBeers} beerData={beer} src={beer.img} id={beer._id} name={beer.name} abv={beer.abv} description={beer.description} addBeer={this.props.addBeer} deleteBeer={this.props.deleteBeer} updateBeer={this.props.updateBeer}/>)
        return (
            <div className="App">
                <h1>My Favourite Beers</h1>
                {this.state.isLoading && <ReactLoading style={center} type="bubbles" color="black" height={400} width={350} />}
                <div className="beer-container">
                    
                    {beers}
                </div>
                
            </div>
        )
    }
    
}

export default MyBeers
