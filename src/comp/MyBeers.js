import React from 'react'
import Beer from './Beer'
import axios from 'axios'
class MyBeers extends React.Component {
    constructor() {
        super()
    //     this.state = {
    //         beerData: [],
    //         favouriteBeers: []
    //     }
    //     this.addBeer = this.addBeer.bind(this)
    }

    // addBeer(id) {
    //     console.log(`Beer ${id} added`)
    // }
    componentDidMount() {
            axios.get("http://localhost:5000/my-beers/").then(res => {
            this.setState({favouriteBeers: res.data})
            console.log(res.data)})
       
    }
    render() {
        const beers = this.props.favouriteBeers.map(beer => <Beer myBeers={true} beerData={beer} src={beer.img} id={beer._id} name={beer.name} abv={beer.abv} description={beer.description} addBeer={this.props.addBeer} deleteBeer={this.props.deleteBeer} updateBeer={this.props.updateBeer}/>)
        return (
            <div className="App">
                <h1>My Favourite Beers</h1>
                <div className="beer-container">
                    
                    {beers}
                </div>
                
            </div>
        )
    }
    
}

export default MyBeers
