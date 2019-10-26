import React from 'react'
import Beer from './Beer'
import axios from 'axios'
class MyBeers extends React.Component {
    constructor() {
        super()
        this.state = {
            beerData: [],
            favouriteBeers: []
        }
    //     this.addBeer = this.addBeer.bind(this)
    }

    // addBeer(id) {
    //     console.log(`Beer ${id} added`)
    // }
    // componentDidUpdate() {
    //         axios.get("http://localhost:5000/users/my-beers/", {params: {username: this.props.username}}).then(res => {
    //         this.setState({favouriteBeers: res.data})
    //         console.log(res.data)
    //     })
    // }
    componentDidUpdate() {
        console.log(this.props.favouriteBeers)
    }

    //TODO - need MyBeers state to update when App state updates - which it isn't currently.  Consider removing MyBeers state, take App state as props
    render() {
        const beers = this.props.favouriteBeers.map(beer => <Beer myBeers={true} favouriteBeers={this.props.favouriteBeers} beerData={beer} src={beer.img} id={beer._id} name={beer.name} abv={beer.abv} description={beer.description} addBeer={this.props.addBeer} deleteBeer={this.props.deleteBeer} updateBeer={this.props.updateBeer}/>)
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
