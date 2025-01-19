require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 6000;
const notes = [
    {
        content: "First note",
    }
]
const users = [
    {
        name: 'Rohit',
        username: 'Rohiiii'
    }
]
app.get("/", (req, res) => {
    res.send(`default route`);
});
app.get("/users", (req, res) => {
    res.status(200).send(users);
});
app.get("/notes", (req, res) => {
    res.status(200).send(notes)
})
app.listen(PORT, () => {
    console.log(`App runnning on port ${PORT}`)
})