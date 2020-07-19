const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError.js')
let list = require('../fake.js')


// Routes:-
// get all items
router.get('/', (req, res) => {
    res.json({list})
})
// post an item
router.post('/', (req, res, next) => {
    try {
        if (!(req.body.name)) {
            throw new ExpressError(' Must add a name', 403)
        }
        if (!(req.body.price)) {
            throw new ExpressError(' Must add a price', 403)
        }
        const item = {name: req.body.name,  price:req.body.price};
        list.push(item)
        const response = {Message: "item created", Item : item}
        return res.status(201).json(response)
    } catch (e) {
        return next(e)
    }
})
// display single item
router.get('/:item', (req, res, next) => {
    try {
        let item = list.find(it => it.name === req.params.item)


        if (item === undefined) {
            throw new ExpressError('Item not found', 404)
        }        return res.json({Item:item})
    } catch (e) {
        next(e)
    }
})

// edit a single item

router.patch('/:item', (req, res, next) => {
    try {
        let item = list.find(it => it.name === req.params.item)
        if (item === undefined) {
            throw new ExpressError('Item do not exist', 404)
        }
        else {
            req.body.name? item.name = req.body.name: item.name = item.name
            req.body.price ? item.price = req.body.price : item.price = item.price

            return res.json({Message: 'Item changed', Item:item})

        }
    } catch (e) {
        next(e)
    }
})

// delete a single item
router.delete('/:item', (req, res, next) => {
    try {

        let item = list.find(it => it.name === req.params.item)
        if (item === undefined) {
            throw new ExpressError('Item do not exist', 404)
        }

        items.splice(item, 1)
        return res.json({Message: "Deleted!"})

    }
    catch (e) {
        next(e)
    }
})


// export the router
module.exports = router