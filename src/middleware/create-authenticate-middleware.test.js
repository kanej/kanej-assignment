const request = require('supertest')
const express = require('express')
const createAuthenticateMiddleware = require('./create-authenticate-middleware')

describe('Create Authenticate Middleware', () => {
  let apiKey
  let server
  let mockApiKeyService

  beforeAll(() => {
    mockApiKeyService = {
      allowApiKey: true,
      apiKey: null,
      allow: function (givenApiKey) {
        apiKey = givenApiKey
        return this.allowApiKey
      },
    }

    const app = express()

    app.post(
      '/api/v0/swarm/addrs',
      createAuthenticateMiddleware(mockApiKeyService),
      (_req, res) => {
        res.status(200).send()
      },
    )

    server = request(app)
  })

  describe('authentication', () => {
    it('proxies requests when there is an allowed api key in the authorization header', async () => {
      expect.assertions(2)

      mockApiKeyService.allowApiKey = true
      const res = await server
        .post('/api/v0/swarm/addrs')
        .set('Authorization', `xxx-yyy-zzz`)
        .send()

      expect(res.status).toEqual(200)
      expect(apiKey).toBe(`xxx-yyy-zzz`)
    })

    it('should reject api requests without an authorization header', async () => {
      expect.assertions(1)

      const res = await server.post('/api/v0/swarm/addrs').send()

      expect(res.status).toEqual(403)
    })

    it('should reject api requests when the api key is not allowed', async () => {
      expect.assertions(1)

      mockApiKeyService.allowApiKey = false
      const res = await server
        .post('/api/v0/swarm/addrs')
        .set('Authorization', `xxx-yyy-zzz`)
        .send()

      expect(res.status).toEqual(403)
    })
  })
})
