const ApiKeyService = require('./services/api-key-service')
const knex = require('knex')
const { PORT } = require('./constants')
const setupWebserver = require('./setupWebserver')

const knexClient = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'fleek',
    password: 'fleek-password',
    database: 'assignment',
  },
  pool: {
    min: 0,
    max: 7,
  },
})

const apiKeyService = new ApiKeyService(knexClient)
const app = setupWebserver(apiKeyService)

app.listen(PORT, () => {
  console.log(`Assignment Webserver listening at http://localhost:${PORT}`)
})
