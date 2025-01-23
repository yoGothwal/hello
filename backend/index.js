const app = require('./app')
const config = require('./utils/config')
app.listen(config.PORT, () => {
    console.log(`App runnning on port ${config.PORT}`)
})