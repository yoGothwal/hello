require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 6000;
let notes = [
    {
        content: "First note",
        id: 0,
        important: true
    },
    {
        cont: "Second note",
        id: 1,
        important: false
    },
    {
        content: "Third note",
        id: 2,
        important: true
    }
]
let users = [
    {
        name: 'Rohit',
        username: 'Rohiiii'
    }
]
app.get("/", (req, res) => {
    res.send(`hello world`);
});

app.get("/api/notes", (req, res) => {
    res.status(200).json(notes)
})
app.get("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const note = notes.find(note => note.id === id)
    res.status(200).json(note)
})
app.post("/api/notes", (req, res, next) => {
    try {
        const { content } = req.body
        if (!content) {
            return res.status(400).json({ error: "Content missing" });
        }
        const newNote = {
            content: content
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

app.get("/api/users", (req, res) => {
    res.status(200).send(users);
});
app.listen(PORT, () => {
    console.log(`App runnning on port ${PORT}`)
})