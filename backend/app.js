const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const notesRouter = require('./controllers/notes')
const signupRouter = require('./controllers/signup')
const middleWare = require("./utils/middleware")

/////////mongoose_connection/////////////
const mongoose = require("mongoose")
const config = require("./utils/config")
mongoose.set("strictQuery", false)

mongoose.connect(config.MONGO_URI).then(res => {
    console.log("connected to mongodb")
})
//////////////////////////////////
app.use(middleWare.requestLogger)
app.get('/', (req, res) => {
    res.send('hello world')
})
app.use('/api/notes', notesRouter)
app.use('/api/signup', signupRouter)
app.get('/api/users', (req, res) => {
    res.status(200).send(users)
})
app.use(middleWare.unknownEndpoint)
app.use(middleWare.errorHandler)
module.exports = app