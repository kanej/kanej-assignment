const ApiKeyService = require('./services/api-key-service')
const RequestLogService = require('./services/request-log-service')
const AdminService = require('./services/admin-service')
const LoginService = require('./services/login-service')
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
const requestLogService = new RequestLogService(knexClient)
const adminService = new AdminService(knexClient)
const loginService = new LoginService(knexClient)

const app = setupWebserver(
  apiKeyService,
  requestLogService,
  adminService,
  loginService,
)

app.listen(PORT, () => {
  console.log(`Assignment Webserver listening at http://localhost:${PORT}`)
})
