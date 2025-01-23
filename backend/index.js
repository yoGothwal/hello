require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const config = require('./utils/config')
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
const PORT = process.env.PORT || 6000
const Note = require('./models/note')
let users = [
    {
        name: 'Rohit',
        username: 'Rohiiii'
    }
]
const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method)
    next()
}
const unknownApi = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(requestLogger)
app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/api/notes', (req, res) => {
    Note.find().then(notes => {
        res.json(notes)
    })
})
app.get('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const note = Note.findById(id)
    if (!note) {
        res.status(200).json({ message: 'note doesn\'t exist' })
    }
    res.status(200).json(note)
})
app.post('/api/notes', (req, res, next) => {
    try {
        const { content } = req.body
        if (!content) {
            return res.status(400).json({ error: 'Content missing' })
        }
        const newNote = new Note({
            content: content,
            important: req.body.important || true
        })
        newNote.save().then(note => res.json(note)).catch(error => {
            next(error)
        })
    } catch (error) {
        next(error)
    }
})
app.delete('/api/notes/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const n = Note.findById(id)
        if (!n) {
            res.json({ message: 'note doesn\'t exist or it has been deleted already' })
        }
        await Note.findByIdAndDelete(id)
        console.log('note to be deleted:', n)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})
app.use((err, req, res, next) => {
    console.error(err.name, err.message, err.status)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)

})

app.post('/api/login', (req, res, next) => {
    console.log(req.body)
    const { username, password } = req.body
    res.status(201).json({ username: username, password, token: '1234' })

})
app.post('/api/signup', (req, res, next) => {
    console.log(req.body)
    const { username, password } = req.body
    res.status(201).json({ username: username, password, token: '1234' })

})

app.get('/api/users', (req, res) => {
    res.status(200).send(users)
})
app.use(unknownApi)
app.listen(config.PORT, () => {
    console.log(`App runnning on port ${config.PORT}`)
})