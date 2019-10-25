import React from 'react'

class Beer extends React.Component {
    constructor() {
        super()
        this.state = {
            clickText: "Add to favourites"
        }
        this.clickedText = this.clickedText.bind(this)
    }

    clickedText() {
        this.setState({clickText: "Saved"})
    }

    render() {
        // checks to see if favourite beers includes this beer, if so render saved
        const checkBeerIncluded = this.props.search && JSON.stringify(this.props.favouriteBeers).includes(this.props.beerData.name)
        const clickText = checkBeerIncluded ? "Saved" : "Add to Favourites"
        this.props.search && console.log(this.props.beerData, this.props.favouriteBeers) 
        const stars = []
        for (let i=0; i<this.props.beerData.stars; i++) {
            stars.push(<span>&#11088;</span>)
        }
        return (
            <div className="beer">
                <img className="thumb" src={this.props.src}></img>
                <h3>{this.props.beerData.beerName || this.props.beerData.name}</h3>
                <h4>ABV: {this.props.beerData.beerType || this.props.beerData.abv}%</h4>
                <p className="description">{this.props.beerData.beerDescription || this.props.beerData.tagline}</p>
                {this.props.search && <span onClick={() => {
                    //only add to favourites if not already included
                    !checkBeerIncluded && this.props.addBeer(this.props.beerData)
                    this.clickedText()}} 
                    className="buttons">
                    {/* {this.state.clickText} */}
                    {clickText}
                    </span>
                }
                <span className="buttons">
                    
                    {stars}
                </span> 
                {this.props.myBeers && <span className="ratings">Rate: 
                    <span onClick={() => this.props.updateBeer(this.props.id, 1)}>1</span>
                    <span onClick={() => this.props.updateBeer(this.props.id, 2)}>2</span>
                    <span onClick={() => this.props.updateBeer(this.props.id, 3)}>3</span>
                    <span onClick={() => this.props.updateBeer(this.props.id, 4)}>4</span>
                    <span onClick={() => this.props.updateBeer(this.props.id, 5)}>5</span>
                </span>
                }
                
                {this.props.myBeers && 
                    <span onClick={() => this.props.deleteBeer(this.props.id)} className="delete-beer"> Delete </span>
                }
            </div>
        )
        }
}

export default Beer