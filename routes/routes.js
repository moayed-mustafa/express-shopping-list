const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError.js')
const list = require('../fake.js')


// Routes:-
// get all items
router.get('/', (req, res) => {
    console.log('this is list:')
    console.log(list)
    res.json({list})
})
// post an item
router.post('/', (req, res, next) => {
    console.log('this is list:')
console.log(list)
    try {
        if (!(req.body.name)) {
            console.log('name error?')
            throw new ExpressError(' Must add a name', 404)
        }
        if (!(req.body.price)) {
            console.log('price error?')
            throw new ExpressError(' Must add a price', 404)
        }
        const item = {name: req.body.name,  price:req.body.price};
        list.push(item)
        const response = {Message: "item craeted", Item : item}
        return res.status(201).json(response)
    } catch (e) {
        console.log("error")
        return next(e)
    }
})
// display single item
            // ✖︎
router.get('/:item', (req, res, next) => {
    console.log('this is list:')
console.log(list)
    try {
        console.log(req.params.name)
    let item = list.find(it => it.name === req.params.name)
        if (item === undefined) {
            console.log('error item ')
            throw new ExpressError('Item not found', 402)
        }
        console.log('found the item!', item)
        return res.json({Item:item})
    } catch (e) {
        console.log('error on catch')
        next(e)
    }
})

// edit a single item
            // ✖︎
router.patch('/:item', (req, res, next) => {
    try {
        let item = list.find(it => it.name === req.params.name)
        console.log(item)
        if (item === undefined) {
            console.log('error item ')
            throw new ExpressError('Item do not exist', 402)
        }
        console.log('found the item!', item)
        // change the item stuff
        req.body.name? item.name = req.body.name: item.name = item.name
        req.body.price ? item.price = req.body.price : item.price = item.price
        console.log(item)

        return res.json({Msg: 'Item changed', Item:item})
    } catch (e) {
        console.log('error on catch patch')
        next(e)
    }
})

// delete a single item
router.delete('/:item', (req, res, next) => {
    try {
        let item = list.find(it => it.name === req.params.name)
        if (item == - 1) {
            throw new ExpressError('Item do not exist', 402)
        }

        items.splice(item, 1)
        return res.json({Msg: "Deleted!"})

    } catch (e) {
        next(e)
    }
})





// export the router
module.exports = router