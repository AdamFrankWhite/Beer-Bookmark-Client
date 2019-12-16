import React from 'react'


function Brewery(props) {
    return (
        <div>
            <h2>Brewery: {props.name} </h2>
            <h2>Beers: {props.beerNum}</h2>
            <h2>Location: {props.location}</h2>
            <img src={props.img} />
        </div>
    )
}

export default Brewery