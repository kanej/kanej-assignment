/* eslint-disable camelcase */
const express = require('express')
var cookieSession = require('cookie-session')
const { createProxyMiddleware } = require('http-proxy-middleware')
const createAuthenticateMiddleware = require('./middleware/create-authenticate-middleware')
const createRequestLogMiddleware = require('./middleware/create-request-log-middleware')
const { IPFS_ENDPOINT, SECRET } = require('./constants')

const setupWebserver = (
  apiKeyService,
  requestLogService,
  adminService,
  loginService,
) => {
  const app = express()

  app.use(
    cookieSession({
      name: 'session',
      keys: [SECRET],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
  )

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

  app.post('/admin/signin', express.json(), async (req, res) => {
    try {
      const { username, password } = req.body

      const { authenticate, userId } = await loginService.signIn(
        username,
        password,
      )

      if (!authenticate) {
        return res.sendStatus(403)
      }

      req.session.userId = userId

      res.sendStatus(200)
    } catch (error) {
      console.error(error)
      return res.status('500').send()
    }
  })

  // Ensure sign in has appened for all /admin/api endpoints
  app.use('/admin/api', (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.sendStatus(403)
    }

    next()
  })

  app.get('/admin/api/whoami', async (req, res) => {
    const userId = req.session.userId

    res.send({ userId })
  })

  app.get('/admin/api/api-keys', async (req, res) => {
    try {
      const userId = req.session.userId

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
        const userId = req.session.userId
        const { id, user_id, enabled } = req.body

        await adminService.setApiKeyEnabled(id, userId, enabled)

        res.send({ id, user_id, enabled })
      } catch (error) {
        console.error(error)
        return res.status('500').send()
      }
    },
  )

  app.put('/admin/api/api-keys/', express.json(), async (req, res) => {
    try {
      const userId = req.session.userId

      const apiKey = await adminService.createNewApiKeyFor(userId)

      res.send(apiKey)
    } catch (error) {
      console.error(error)
      return res.status('500').send()
    }
  })

  return app
}

module.exports = setupWebserver
