const express = require('express')
const router = require('./routes/routes.js')
const ExpressError = require('./expressError.js')
const app = express()




app.use(express.json())
app.use('/items', router)


// create a 404 route
app.use((req, res, next) => {
    // throw an error
    return new ExpressError('route does not exist', 404)
})

// error handler
app.use((err, req, res, next) => {
    const status = err.status|| 500;
    const msg = err.msg
    data = { "msg": msg, "status": status }
    return res.status(status).json(data)
})

module.exports = app