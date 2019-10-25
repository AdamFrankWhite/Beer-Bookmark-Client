import React from 'react'

class RandomBeer extends React.Component {
    constructor() {
        super()
        this.state = {
            beerData: []
        }
    }

    componentDidMount() {
        const beerData = fetch("https://api.punkapi.com/v2/beers/random").then(response => response.json()).then(data => this.setState({beerData: data[0]}))
        // this.setState({
        //     beerData: beerData
        // })
    }
    render() {
        let imgUrl = this.state.beerData.image_url
        let beerName = this.state.beerData.name
        let beerDescription = this.state.beerData.description
        console.log(this.state.beerData)
        return (
            <div className="randomBeer">
                <h2>{beerName}</h2>
                <p>{beerDescription}</p>
                <img className="thumb" src={imgUrl}></img>
            </div>
        )
    }
    
}

export default RandomBeer
