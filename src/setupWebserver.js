/* eslint-disable camelcase */
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

  app.get('/admin/api/api-keys', async (req, res) => {
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

  app.get('/admin/api/api-keys/:apiKeyId/request-logs', async (req, res) => {
    try {
      const { apiKeyId } = req.params

      const apiKeys = await adminService.getRequestLogsFor(apiKeyId)

      res.send(apiKeys)
    } catch (error) {
      console.error(error)
      return res.status('500').send()
    }
  })

  app.post(
    '/admin/api/api-keys/:apiKeyId',
    express.json(),
    async (req, res) => {
      try {
        const { id, user_id, enabled } = req.body

        await adminService.setApiKeyEnabled(id, enabled)

        res.send({ id, user_id, enabled })
      } catch (error) {
        console.error(error)
        return res.status('500').send()
      }
    },
  )

  return app
}

module.exports = setupWebserver
