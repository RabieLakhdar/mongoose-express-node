const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const IndexRouter = require('./api/router/index')
const UserRouter = require('./api/router/user')


//Body parser
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CROS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

//Router
app.use('/', IndexRouter)
app.use('/users', UserRouter)

//manage Error handle
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {

    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})



module.exports = app