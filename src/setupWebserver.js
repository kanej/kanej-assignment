const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const createAuthenticateMiddleware = require('./middleware/create-authenticate-middleware')
const createRequestLogMiddleware = require('./middleware/create-request-log-middleware')
const { IPFS_ENDPOINT } = require('./constants')

const setupWebserver = (apiKeyService, requestLogService) => {
  const app = express()

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

  return app
}

module.exports = setupWebserver
