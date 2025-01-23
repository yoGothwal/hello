const mongoose = require("mongoose")
const config = require("../utils/config")
mongoose.set("strictQuery", false)

mongoose.connect(config.MONGO_URI).then(res => {
    console.log("connected to mongodb")
})
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,

        required: true
    },
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