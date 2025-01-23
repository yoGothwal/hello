const mongoose = require("mongoose")
const uri = process.env.MONGO_URI
mongoose.set("strictQuery", false)
mongoose.connect(uri)
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
const Note = mongoose.model('Note', noteSchema)
noteSchema.set('toJSON', {
    transform: (document, returnedDoc) => {
        returnedDoc.id = returnedDoc._id.toString()
        delete returnedDoc._id
        delete returnedDoc.__v
    }
})
module.exports = Note