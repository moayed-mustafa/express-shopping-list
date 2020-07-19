// we got to set an environment for var for testing
process.env.NODE_ENV = 'test'
//  we got to reaquire supertest and app
const request = require('supertest')
const app = require('../app.js')

let list = require('../fake')
// let list = []
let item = { name: 'bread', price: 1.99 }

beforeEach(() => {
    list.push(item)
})


afterEach(()=>{ list.length = 0})



// TEST Yeaaah

//  I can view the list with the preper items in it
describe('Get all items', () => {
    test('testing to get all items from itmes', async () => {
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual( {'list':list})
    })
})
// I can get an item that exists
describe('Get a specific item', () => {
    test('testing to get an item that is in itmes', async () => {
        const res = await request(app).get(`/items/${item.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual( {Item:item})
    })

    test('testing to get an item that is not in itmes', async () => {
        const res = await request(app).get(`/items/cake`)
        expect(res.statusCode).toBe(404)
        let data = {msg:"Item not found", status: 404}
        expect(res.body).toEqual(data)
    })
})
//  I can add to the list
describe('Add an item to the list', () => {
    test('test to see if you can post an item to the api', async () => {
        let item = { name: 'milk', price: 2.99 }
        const res = await request(app).post('/items').send(item)
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({Message:"item created", Item: item})

    })
})


//  I can edit an item in the list
describe('Edit an item from list', () => {
    test("test editing the price of an item that's on the list", async () => {
        let newData = {name: 'milk', price: 3.50}
        const res = await request(app).patch(`/items/${item.name}`).send(newData)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({Message: 'Item changed', Item:item})
    })
    test("test edit the name of an item that's on the list", async () => {
        let newData = {name: 'goat-milk', price: 3.50}
        const res = await request(app).patch(`/items/${item.name}`).send(newData)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({Message: 'Item changed', Item:item})
    })

    test('test editing the name of an item not in list raises an error', async () => {
        const res = await request(app).patch(`/items/jdjj`)
        expect(res.statusCode).toEqual(404)
        expect(res.body).toEqual({msg:'Item do not exist', status:404})
    })

})

//  I can delete from the list
describe('Delete an item from list', () => {
    test("test delete an item that's on the list", async () => {
        const res = await request(app).delete(`/items/${item.name}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({Message: 'Deleted!'})
    })

    test('test deleting the name of an item not in list raises an error', async () => {
        const res = await request(app).delete(`/items/jdjj`)
        expect(res.statusCode).toEqual(404)
        expect(res.body).toEqual({msg:'Item do not exist', status:404})
    })

})