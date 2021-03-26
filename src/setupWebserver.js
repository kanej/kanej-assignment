const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')
const createAuthenticateMiddleware = require('./middleware/create-authenticate-middleware')
const createRequestLogMiddleware = require('./middleware/create-request-log-middleware')
const { IPFS_ENDPOINT } = require('./constants')

const setupWebserver = (apiKeyService, requestLogService, adminService) => {
  const app = express()

  app.use(cors())

  app.use(
    '/api',
    createAuthenticateMiddleware(apiKeyService),
    createRequestLogMiddleware(requestLogService),
    createProxyMiddleware({
      target: IPFS_ENDPOINT,
    }),
  )

  app.get('/', (_req, res) => {
    res.send('Welcome to the Assignment Webserver')
  })

  app.get('/admin/api/apikeys', async (req, res) => {
    try {
      /* TODO: pull from token */
      const userId = 1

      const apiKeys = await adminService.getApiKeysFor(userId)

      res.send(apiKeys)
    } catch (error) {
      console.error(error)
      return res.status('500').send()
    }
  })

  return app
}

module.exports = setupWebserver
