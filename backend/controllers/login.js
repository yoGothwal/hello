const loginRouter = require('express').Router()
loginRouter.post('/', (req, res, next) => {
    console.log(req.body)
    const { username, password } = req.body
    res.status(201).json({ username: username, password, token: '1234' })

})
module.exports = loginRouter