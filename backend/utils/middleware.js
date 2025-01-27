const errorHandler = (error, req, response, next) => {
    console.error(error.name, error.message, error.status || 404)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)

}
const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method)
    next()
}
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
module.exports = { errorHandler, unknownEndpoint, requestLogger }