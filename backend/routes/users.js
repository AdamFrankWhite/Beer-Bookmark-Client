const router = require('express').Router()
let User = require('../models/user.model')
const bcrypt = require('bcrypt')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/login').post((req, res, next) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    User.authenticate(user.username, user.password, (error, user) => {
        if (error || !user) {
            let err = new Error('User or password do not match')
            err.status = 401
            return next(err)
        } else {
            console.log("Success")
            return res
        }
    })

    
    // User.findOne(user)
    //     .then(user => res.json(user))
    //     .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/register').post((req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const newUser = new User({
        username,
        password,
        email
    })
    bcrypt.hash(password, 10, function(err, hash) {
        newUser.password = hash
        newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error is... ' + err))
      });
    
})

// Beer routes

router.route('/my-beers/').get((req, res) => {
    console.log(req.query.username)
    User.findOne({username: req.query.username})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/my-beers/add').post((req, res) => {
    const addBeerDetails = {
        id: req.body.id,
        beerName: req.body.beerName,
        beerType: req.body.beerType,
        beerDescription: req.body.beerDescription,
        brewery: req.body.brewery,
        date: Date.parse(req.body.date),
        stars: req.body.stars,
        img: req.body.img
    }
    
    console.log(addBeerDetails)
    User.findOne({username: req.body.username})
        .then(user => {
            console.log("User found")
            console.log(user.beers)
            let beers = [...user.beers]
            beers.push(addBeerDetails)
            console.log(beers)
            user.beers = beers
            user.save()
                .then(() => { 
                    res.json("Beer added")
                }).catch( err => res.json('Error: ' + err))
        })   
    })
   

router.route('my-beers/:id').delete((req, res) => {
    Beer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Beer deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('my-beers/update/:id').post((req, res) => {
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