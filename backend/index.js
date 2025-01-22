require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
const PORT = process.env.PORT || 6000;
let notes = [
    {
        content: "no",
        id: 0
    }
]
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
app.get("/", (req, res) => {
    res.send(`hello world`);
});

app.get("/api/notes", (req, res) => {
    res.status(200).json(notes)
})
app.get("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const note = notes.find(note => note.id === id)
    if (!note) {
        res.status(200).json({ message: "note doesn't exist" })
    }
    res.status(200).json(note)
})
app.post("/api/notes", (req, res, next) => {
    try {
        const { content } = req.body
        const id = notes.length + 1
        if (!content) {
            return res.status(400).json({ error: "Content missing" });
        }
        const newNote = {
            content: content,
            id: id,
            important: true
        }
        notes = notes.concat(newNote)
        res.status(201).json(newNote)
    } catch (error) {
        next(error)
    }
})
app.delete('/api/notes/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const n = notes.find(note => note.id === id)
        console.log("note to be deleted:", n)
        if (!n) {
            res.json({ message: "note doesn't exist or it has been deleted already" })
        }
        notes = notes.filter(note => note.id !== id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})
app.use((err, req, res, next) => {
    console.error(err.message, err.status);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
        status: err.status || 500
    });
});

app.post("/api/login", (req, res, next) => {
    console.log(req.body)
    const { username, password } = req.body
    res.status(201).json({ username: username, password, token: "1234" })

})
app.post("/api/signup", (req, res, next) => {
    console.log(req.body)
    const { username, password } = req.body
    res.status(201).json({ username: username, password, token: "1234" })

})

app.get("/api/users", (req, res) => {
    res.status(200).send(users);
});
//app.use(unknownApi)
app.listen(PORT, () => {
    console.log(`App runnning on port ${PORT}`)
})