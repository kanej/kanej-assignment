const ApiKeyService = require('./services/api-key-service')
const { PORT } = require('./constants')
const setupWebserver = require('./setupWebserver')

const apiKeyService = new ApiKeyService()
const app = setupWebserver(apiKeyService)

app.listen(PORT, () => {
  console.log(`Assignment Webserver listening at http://localhost:${PORT}`)
})
