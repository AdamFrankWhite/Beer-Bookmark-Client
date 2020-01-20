import React from 'react'
import axios from 'axios'

class RandomBeer extends React.Component {
    constructor() {
        super()
        this.state = {
            beerData: []
        }
    }

    componentDidMount() {
        const randomNum = Math.floor(Math.random() * 15000)
        const randomSearchTerm = "red"
        // search by ID
        axios.get(`https://api.untappd.com/v4/search/beer?q=${randomSearchTerm}`, {params: {client_id:"F94775549BAC795E436858A50A3616690D3CD446", client_secret:"844CF3E397DB0294FC89ACE34560918CAFD035FB"}}).then(response => {
            let results = response.data.response.beers.items
            let randomNum = Math.floor(Math.random * results.length)
            this.setState({beerData: results[randomNum]})
            console.log(results)
        })
    }
    render() {
        return (
            <h1>Something</h1>
        )
    }
    
}

export default RandomBeer
