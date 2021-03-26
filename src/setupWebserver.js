const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const createAuthenticateMiddleware = require('./middleware/createAuthenticateMiddleware')
const { IPFS_ENDPOINT } = require('./constants')

const setupWebserver = (apiKeyService) => {
  const app = express()

  app.use(
    '/api',
    createAuthenticateMiddleware(apiKeyService),
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
