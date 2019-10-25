const router = require('express').Router()
let Beer = require('../models/beer.model')

router.route('/').get((req, res) => {
    Beer.find()
        .then(beers => res.json(beers))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const beerName = req.body.beerName
    const beerType = req.body.beerType
    const beerDescription = req.body.beerDescription
    const brewery = req.body.brewery
    const date = Date.parse(req.body.date)
    const stars = req.body.stars
    const img = req.body.img

    const newBeer = new Beer({
        beerName,
        beerType,
        beerDescription,
        brewery,
        date,
        stars,
        img
        
    })
    newBeer.save()
        .then(() => res.json('Beer added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Beer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Beer deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Beer.findById(req.params.id)
        .then(beer => {
            beer.stars = req.body.stars
            // beer.beerID = req.body.beerID
            // beer.beerName = req.body.beerName
            // beer.beerType = req.body.beerType
            // beer.beerDescription = req.body.beerDescription
            // beer.brewery = req.body.brewery
            // beer.date = req.body.date

            beer.save()
                .then(() => res.json('Beer rating updated'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
})

module.exports = router

// {
// 	"stars": "5",
// 	"beerName": "Marshmallow Stout",
// 	"brewery": "Tiny Rebel",
// 	"beerType": "Stout",
// 	"date": "2019-10-16T20:36:52.672Z" ,
// 	"beerDescription": "dark, sweet, thick stout",
// 	"beerID": 5
// }