const notesRouter = require('express').Router()
const Note = require('../models/note')
notesRouter.get('/', async (req, res) => {
    await Note.find().then(notes => {
        res.json(notes)
    })
})
notesRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const note = await Note.findById(id)
    console.log(note)
    if (!note) {
        return res.status(200).json({ message: 'note doesn\'t exist' })
    }
    res.status(200).json(note)
})
notesRouter.post('/', (req, res, next) => {
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
notesRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const n = await Note.findById(id)
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
module.exports = notesRouter